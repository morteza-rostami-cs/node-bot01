import { AppError } from '@/shared/errors/AppError.js';
import type { Request } from 'express';

export function getTokenFromHeaderOrCookie({ req }: { req: Request }): string {
  let refreshToken = req.headers.authorization?.split(' ')[1];

  if (!refreshToken && req.cookies) refreshToken = req.cookies.refreshToken;

  if (!refreshToken) throw new AppError({ message: 'No refresh token provided', statusCode: 400 });

  return refreshToken;
}
