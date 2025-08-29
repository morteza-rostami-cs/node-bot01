import type { Request, Response, NextFunction } from 'express';
import { AppError } from '@/shared/errors/AppError.js';
import { logger } from '@/infra/logging/Logger.js';

export const errorHandler = function (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = (err instanceof AppError && err?.statusCode) || 500;
  const message = (err instanceof AppError && err?.message) || 'Internal Server Error';

  // log the error
  logger.error(`${req?.method} ${req?.url} - ${message} - Stack: ${err?.stack}`);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
