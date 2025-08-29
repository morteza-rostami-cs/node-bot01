// container
import { AuthService } from './service';
import { BcryptHashingAdaptor } from './adaptors/BcryptHashingAdaptor';
import { JwtTokenAdaptor } from './adaptors/JwtTokenAdaptor';
import { MongooseUserRepo } from '@/infra/repositories/MongoUserRepo.js';
import { redisClient } from '@/infra/redis/redisClient.js';
import { AuthController } from './controller';
import { AuthMiddleware } from '@/middleware/authMid.js';

const hasher = new BcryptHashingAdaptor({ saltRounds: 12 });
const jwt = new JwtTokenAdaptor();

// export user repo =>now a mongo repository! it can be changed to sql or something else later
export const userRepo = new MongooseUserRepo();

// a singleton => we can swap jwt or bcrypt for something else, later
export const authService = new AuthService({
  hasherService: hasher,
  tokenService: jwt,
  redisService: redisClient,
  userRepo: userRepo,
});

// controller =>takes a service
export const authController = new AuthController(authService);

// authMiddleware
export const authMiddleware = new AuthMiddleware({ tokenService: jwt, userRepo: userRepo });
