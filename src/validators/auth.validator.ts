import { z } from "zod";

export const validateLogin = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8).trim(),
});

export const validateForgotPassword = z.object({
  email: z.string().email().trim(),
});

export const validateResetPassword = z.object({
  token: z
    .string()
    .trim()
    .min(20, "Token must be at least 20 characters long.")
    .max(512, "Token is too long.")
    .regex(
      /^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+)*$/,
      "Invalid token format. A valid JWT token must contain alphanumeric characters, dashes, underscores, and periods."
    ),
  password: z.string().min(8).trim(),
});

export const validateUpdatePassword = z.object({
  oldPassword: z.string().min(8).trim(),
  newPassword: z.string().min(8).trim(),
  confirmPassword: z.string().min(8).trim(),
});
