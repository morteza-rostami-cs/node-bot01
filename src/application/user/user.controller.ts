import type { Request, Response } from 'express';
import type { AuthService } from './user.service';
import type { User } from '@/domain/entities/User.js';
import { config } from '@/config';
import { getTokenFromHeaderOrCookie } from './user.utils';
import type { RegisterDto, RegisterOutDto } from '@/application/user/dtos/user.dto.js';

export class AuthController {
  // DPI => authService injection
  constructor(private authService: AuthService) {}

  public async register(req: Request, res: Response): Promise<any> {
    try {
      // input data
      const { email, password }: RegisterDto = req.body;

      // register and return tokens
      const user = await this.authService.register({ email: email, password: password });

      // output data
      const output: RegisterOutDto = { id: user.id, email: user.email };

      return res.sendSuccess({ data: output, statusCode: 200, message: 'Register success' });
    } catch (error: any) {
      return res.sendError({ error: error.message, statusCode: 400 });
    }
  }

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const result: { user: User; accessToken: string; refreshToken: string; cookies: any[] } =
        await this.authService.login({
          email: email,
          password: password,
        });

      // set http only cookies => one for each access and refresh
      result.cookies.forEach((c) =>
        res.cookie(c.name, c.value, {
          httpOnly: c.httpOnly,
          maxAge: c.maxAge,
          // sameSite: config.nodeEnv === 'DEV' ? 'none' : 'lax',
          secure: config.nodeEnv === 'DEV' ? false : true,
        }),
      );

      return res.sendSuccess({
        data: { accessToken: result.accessToken, refreshToken: result.refreshToken },
        statusCode: 200,
        message: 'Login success.',
      });
    } catch (error: any) {
      return res.sendError({ error: error.message, statusCode: 400 });
    }
  }

  public async refresh(req: Request, res: Response): Promise<any> {
    try {
      // get the refreshToken from header-bearer or cookies
      const refreshToken = getTokenFromHeaderOrCookie({ req: req });

      const tokens: { accessToken: string; refreshToken: string } = await this.authService.refresh({
        oldRefreshToken: refreshToken,
      });

      // set http only cookies with new tokens
      // 5️⃣ Optionally set new httpOnly cookies for tokens
      res.cookie('accessToken', tokens.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.sendSuccess({ data: tokens, statusCode: 200, message: 'Refresh Success' });
    } catch (error: any) {
      return res.sendError({ error: error.message, statusCode: 400 });
    }
  }

  public async logout(req: Request, res: Response): Promise<any> {
    try {
      // get refreshToken from headers-bearer OR cookies
      const refreshToken = getTokenFromHeaderOrCookie({ req: req });

      const result = await this.authService.logout({ refreshToken: refreshToken });

      // http only cookie => removed
      // Remove cookies
      result.cookies.forEach((c: any) =>
        res.cookie(c.name, c.value, { httpOnly: c.httpOnly, maxAge: c.maxAge }),
      );

      return res.sendSuccess({ data: null, statusCode: 400, message: 'Logout success' });
    } catch (error: any) {
      return res.sendError({ error: error.message, statusCode: 400 });
    }
  }

  /**
   * @swagger
   * /users/profile:
   *   get:
   *     summary: Get the current user's profile
   *     tags: [User]
   *     security:
   *       - bearerAuth: []   # if you use JWT / access tokens
   *     responses:
   *       200:
   *         description: Profile success
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 user:
   *                   type: object
   *                   example:
   *                     id: "12345"
   *                     email: "morteza@gmail.com"
   *                     role: "user"
   *       400:
   *         description: Error fetching profile
   */
  public async profile(req: Request, res: Response): Promise<any> {
    try {
      return res.sendSuccess({
        data: { user: req.user },
        statusCode: 400,
        message: 'Profile success',
      });
    } catch (error: any) {
      return res.sendError({ error: error.message, statusCode: 400 });
    }
  }
}
