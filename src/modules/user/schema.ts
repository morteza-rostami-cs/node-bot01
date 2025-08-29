import { z } from 'zod';

// Body schema for registering a User
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Body schema for login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Body schema for refresh and logout
export const tokensSchema = z.object({
  refreshToken: z.string().min(10),
});
