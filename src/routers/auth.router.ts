import { limiter } from "@/app";
import { handleDeleteAccount } from "@/controller/auth/deleteAccount";
import { handleForgotPassword } from "@/controller/auth/forgotPassword";
import { handleLogin } from "@/controller/auth/login";
import { handleLogOut } from "@/controller/auth/logOut";
import { handelRefreshToken } from "@/controller/auth/refreshToken";
import { handleResetPassword } from "@/controller/auth/resetPassword";
import { handleUpdatePassword } from "@/controller/auth/updatePassword";
import { isLogin, isLogOut } from "@/middlewares/auth.middleware";
import validateRequest from "@/validators";
import {
  validateForgotPassword,
  validateLogin,
  validateResetPassword,
  validateUpdatePassword,
} from "@/validators/auth.validator";
import { Router } from "express";
const authRouter: Router = Router();

authRouter.post(
  "/login",
  limiter,
  isLogOut,
  validateRequest(validateLogin),
  handleLogin
);

authRouter.post("/logOut", limiter, isLogin, handleLogOut);
authRouter.get("/refresh-token", handelRefreshToken);
authRouter.post(
  "/forgot-password",
  limiter,
  validateRequest(validateForgotPassword),
  handleForgotPassword
);
authRouter.put(
  "/reset-password",
  limiter,
  validateRequest(validateResetPassword),
  handleResetPassword
);

authRouter.patch(
  "/update-password",
  limiter,
  isLogin,
  validateRequest(validateUpdatePassword),
  handleUpdatePassword
);

authRouter.delete("/delete-account", isLogin, handleDeleteAccount);

export default authRouter;
