import { successResponse } from "@/utils/response";
import { Response, Request, NextFunction, CookieOptions } from "express";

export const handleLogOut = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    successResponse(res, {
      message: "LogOut successfully",
    });
  } catch (error) {
    next(error);
  }
};
