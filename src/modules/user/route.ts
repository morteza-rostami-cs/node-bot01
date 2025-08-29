import { Router } from 'express';
import { authController } from './index.js';
import { validateBody } from '@/middleware/validate.js';
import { registerSchema, loginSchema, tokensSchema } from './schema';

// authMiddleware
import { authMiddleware } from './index.js'; // this is a object
// middleware method
const { authGuard } = authMiddleware;

const router = Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.post('/refresh', validateBody(tokensSchema), authController.refresh);
router.post('/logout', validateBody(tokensSchema), authController.logout);

router.get('/profile', authGuard, authController.profile);

export default router;
