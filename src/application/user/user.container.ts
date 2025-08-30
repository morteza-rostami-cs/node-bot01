// container
import { AuthService } from './user.service';
import { BcryptHashingAdaptor } from '../../infra/adaptors/bcrypt.adaptor';
import { JwtTokenAdaptor } from '../../infra/adaptors/jwt.adaptor';
import { MongooseUserRepo } from '@/infra/repositories/MongoUserRepo.js';
import { redisClient } from '@/infra/redis/redis.client.js';
import { AuthController } from './user.controller';
import { AuthMiddleware } from '@/middleware/auth.middleware.js';

export function buildUserContainer(): any {
  // adaptors************************
  const hasher = new BcryptHashingAdaptor({ saltRounds: 12 });
  const jwt = new JwtTokenAdaptor();

  // database repositories*******************
  // export user repo =>now a mongo repository! it can be changed to sql or something else later
  const userRepo = new MongooseUserRepo();

  // a singleton => we can swap jwt or bcrypt for something else, later
  const authService = new AuthService({
    hasherService: hasher,
    tokenService: jwt,
    redisService: redisClient,
    userRepo: userRepo,
  });

  // controller =>takes a service
  const authController = new AuthController(authService);

  // authMiddleware
  const authMiddleware = new AuthMiddleware({ tokenService: jwt, userRepo: userRepo });

  // export an object
  return {
    hasherAdaptor: hasher,
    tokenAdaptor: jwt,
    userRepo: userRepo,
    authController: authController,
    authMiddleware: authMiddleware,
  };
}
