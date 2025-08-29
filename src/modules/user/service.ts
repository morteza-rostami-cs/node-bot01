import type { HashingPort } from './ports/HashingPort';
import type { TokenPort } from './ports/TokenPort';
import type { IUserRepository } from '@/domain/repositories/IUserRepository.js';
import { redisClient, type RedisClient } from '@/infra/redis/redisClient.js';
import { Roles, User } from '@/domain/entities/User.js';
import { AppError } from '@/shared/errors/AppError';

export class AuthService {
  private hasherService: HashingPort;
  private tokenService: TokenPort;
  private redisService: RedisClient;
  private userRepo: IUserRepository;

  constructor({
    hasherService,
    tokenService,
    redisService,
    userRepo,
  }: {
    hasherService: HashingPort;
    tokenService: TokenPort;
    redisService: RedisClient;
    userRepo: IUserRepository;
  }) {
    this.hasherService = hasherService;
    this.tokenService = tokenService;
    this.redisService = redisService;
    this.userRepo = userRepo;
  }

  // register
  public async register({ email, password }: { email: string; password: string }): Promise<User> {
    // find existing user
    const existingUser = await this.userRepo.findByEmail({ email: email });

    // if email exist => user already registered
    if (existingUser) throw new Error('Email already exists');

    // hash the password
    const hashed = await this.hasherService.hash({ password: password });

    // create a new user => user Entity
    const user = new User('', email, Roles.USER, hashed);

    // create user in db and return it
    const userDoc = this.userRepo.create({ user: user });

    // just return user doc
    return userDoc;
  }

  // login
  public async login({ email, password }: { email: string; password: string }): Promise<any> {
    // find user by email
    const user: User | null = await this.userRepo.findByEmail({ email: email });

    if (!user) throw new AppError({ message: 'Invalid credentials', statusCode: 400 });

    // check password validity
    const isValid = await this.hasherService.compare({
      password: password,
      hashed: user.passwordHash,
    });

    if (!isValid) throw new AppError({ message: 'Invalid credentials', statusCode: 400 });

    const auth_payload = {
      userId: user.id,
      role: user.role,
    };

    // create an accessToken and refreshToken
    const accessToken: string = this.tokenService.signAccessToken({
      payload: auth_payload,
    });

    // refresh token
    const refreshToken: string = this.tokenService.signRefreshToken({ payload: auth_payload });

    // Store refresh token in Redis with TTL (e.g., 7 days)
    // `refresh_${user.id}`, refreshToken, 7 * 24 * 60 * 60
    await this.redisService.set({
      key: `refresh_${user.id}`,
      value: refreshToken,
      ttlSeconds: 7 * 24 * 60 * 60,
    });

    return {
      user,
      accessToken,
      refreshToken,
      cookies: [
        { name: 'accessToken', value: accessToken, httpOnly: true, maxAge: 15 * 60 * 1000 },
        {
          name: 'refreshToken',
          value: refreshToken,
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        },
      ],
    };
  }

  // refresh token
  public async refresh({ oldRefreshToken }: { oldRefreshToken: string }): Promise<any> {
    // verify and decode
    const payload = this.tokenService.verifyRefreshToken({ token: oldRefreshToken });

    if (!payload) throw new AppError({ message: 'Invalid refresh token', statusCode: 400 });

    // check old refresh token in redis
    const userId = (payload as any).userId;

    const storedToken = await this.redisService.get({ key: `refresh_${userId.id}` });

    // if refresh token does not exist in redis
    if (storedToken !== oldRefreshToken)
      throw new AppError({ message: 'Refresh token revoked', statusCode: 401 });

    // fetch user
    const user = await this.userRepo.findById(userId);

    if (!user) throw new AppError({ message: 'user does not exists', statusCode: 401 });

    const auth_payload = { userId: user.id, role: user.role };

    // so: if refresh token is real =>generate a new access and refresh
    const accessToken: string = this.tokenService.signAccessToken({ payload: auth_payload });
    const refreshToken: string = this.tokenService.signRefreshToken({ payload: auth_payload });

    // delete the old one
    // await this.redisService

    // update redis with new refresh
    await this.redisService.set({
      key: `refresh_${user.id}`,
      value: refreshToken,
      ttlSeconds: 7 * 24 * 60 * 60,
    });

    return { accessToken, refreshToken };
  }

  // logout
  public async logout({ refreshToken }: { refreshToken: string }): Promise<any> {
    // verify and decode token
    const payload = this.tokenService.verifyRefreshToken({ token: refreshToken });

    if (!payload) return false;

    const userId = (payload as any).userId;
    // delete the refresh from redis
    await this.redisService.del({ key: `refresh_${userId}` });
    return {
      // provide cookies => to be updated in controller response
      cookies: [
        // one cookies for access
        { name: 'accessToken', value: '', httpOnly: true, maxAge: 0 },
        // one cookies for refresh
        { name: 'refreshToken', value: '', httpOnly: true, maxAge: 0 },
      ],
    };
  }
}
