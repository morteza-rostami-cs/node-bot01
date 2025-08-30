import { z } from 'zod';

// Body schema for registering a User
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// input
export type RegisterDto = z.infer<typeof registerSchema>;

// output
export type RegisterOutDto = {
  id: string;
  email: string;
};

//#============================================

// Body schema for login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof loginSchema>;

//#============================================

// Body schema for refresh and logout
export const tokensSchema = z.object({
  refreshToken: z.string().min(10),
});

export type TokensSchema = z.infer<typeof tokensSchema>;
