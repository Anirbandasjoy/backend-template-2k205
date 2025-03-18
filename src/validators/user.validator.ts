import { z } from "zod";

export const validateProcessSignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).trim(),
});

const jwtPattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

export const validateSignUp = z.object({
  token: z
    .string()
    .min(10, { message: "Token must be at least 10 characters long" })
    .regex(jwtPattern, { message: "Invalid JWT token format" }),
});
export const validateUserUpdate = z.object({
  name: z.string().optional(),
});
