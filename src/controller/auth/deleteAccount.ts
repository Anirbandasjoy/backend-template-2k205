import { createError, bcrypt } from "@/config";
import User from "@/models/user.model";
import { successResponse } from "@/utils/response";
import { Response, Request, NextFunction, CookieOptions } from "express";

export const handleDeleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?._id;
    const { password } = req.body;

    if (!id || !password) {
      return next(createError(400, "User ID and password are required."));
    }

    const user = await User.findById(id);

    if (!user || !user.password) {
      return next(createError(404, "User not found or password not set."));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(401, "Invalid password."));
    }
    await User.findByIdAndDelete(id);
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    successResponse(res, {
      statusCode: 200,
      message: "Account deleted successfully.",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
