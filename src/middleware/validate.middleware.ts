import type { Request, Response, NextFunction } from 'express';
import { ZodType, z } from 'zod';
import { AppError } from '@/shared/errors/AppError.js';

// const schema: ZodType<{ name: string }> = z.object({ name: z.string() });

// Validate req.body
export const validateBody =
  // it get's schema => and validates
  (schema: ZodType<any>) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new AppError({
        message: result.error.issues.map((e) => e.message).join(', '),
        statusCode: 400,
      });
    }
    req.body = result.data; // sanitized data
    next();
  };

// Validate req.query
export const validateQuery =
  (schema: ZodType<any>) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      throw new AppError({
        message: result.error.issues.map((e) => e.message).join(', '),
        statusCode: 400,
      });
    }
    req.query = result.data;
    next();
  };

// Validate req.params
export const validateParams =
  (schema: ZodType<any>) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      throw new AppError({
        message: result.error.issues.map((e) => e.message).join(', '),
        statusCode: 400,
      });
    }
    req.params = result.data;
    next();
  };
