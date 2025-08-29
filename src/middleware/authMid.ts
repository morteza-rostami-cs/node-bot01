import type { User } from '@/domain/entities/User.js';
import type { IUserRepository } from '@/domain/repositories/IUserRepository.js';
import type { TokenPayload, TokenPort } from '@/modules/user/ports/TokenPort.js';
import { AppError } from '@/shared/errors/AppError.js';
import type { NextFunction, Request, Response } from 'express';

// setup a type in req for => req.user
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

// class for passing a service => this way i can change the tokenService later as i want
export class AuthMiddleware {
  private tokenService: TokenPort;
  private userRepo: IUserRepository;

  constructor({ tokenService, userRepo }: { tokenService: TokenPort; userRepo: IUserRepository }) {
    this.tokenService = tokenService;
    this.userRepo = userRepo;
  }

  // this is the actual middleware
  public async authGuard(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      // get access token from headers->bearer OR from cookies
      const accessHead = req.headers.authorization?.split(' ')[1];
      const accessCookie = req.cookies.accessToken;

      const accessToken = accessHead || accessCookie;

      if (!accessToken) throw new AppError({ message: 'No token provided', statusCode: 400 });

      const payload: TokenPayload = this.tokenService.verifyAccessToken({ token: accessToken });

      // let's put put the full user in => req.user
      const user = await this.userRepo.findById({ id: payload.userId });

      if (!user) throw new AppError({ message: 'unAuthorized!', statusCode: 401 });

      // setup the payload inside req
      req.user = user;
      // move to the next middleware
      next();
    } catch (error: any) {
      return res.sendError({ error: error.message, statusCode: 400 });
    }
  }
}
