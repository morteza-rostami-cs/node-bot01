import type { Response, Request, NextFunction } from 'express';

// add new methods type => to response object
declare global {
  namespace Express {
    interface Response {
      sendSuccess<T>({
        data,
        statusCode,
      }: {
        data: T;
        statusCode?: number;
        message?: string;
      }): Response;
      // error: string | object, statusCode?: number
      sendError({
        error,
        statusCode,
      }: {
        error: string | object;
        statusCode?: number;
        message?: string;
      }): Response;
    }
  }
}

// middleware for adding custom response methods to res object.
export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.sendSuccess = function <T>({
    data,
    statusCode = 200,
    message = '',
  }: {
    data: T;
    statusCode: number;
    message: string;
  }) {
    return this.status(statusCode).json({ success: true, data, message });
  };
  res.sendError = function ({
    error,
    statusCode = 400,
    message = '',
  }: {
    error: string | object;
    statusCode: number;
    message: string;
  }) {
    return this.status(statusCode).json({ success: false, error, message });
  };
  next();
};
