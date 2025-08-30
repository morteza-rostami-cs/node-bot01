import { Router } from 'express';
import { validateBody } from '@/middleware/validate.middleware.js';
import { registerSchema, loginSchema, tokensSchema } from '@/application/user/dtos/user.dto.js';

// authMiddleware, and authController
import { container } from '@/container.js';
const { authMiddleware, authController } = container.user;

// middleware method
const { authGuard } = authMiddleware;

const router = Router();

router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.post('/refresh', validateBody(tokensSchema), authController.refresh);
router.post('/logout', validateBody(tokensSchema), authController.logout);

router.get('/profile', authGuard, authController.profile);

export default router;
