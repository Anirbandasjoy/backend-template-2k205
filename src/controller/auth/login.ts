import { createError } from "@/config";
import User from "@/models/user.model";
import { Request, Response, NextFunction } from "express";
import { bcrypt } from "@/config";
import { Types } from "mongoose";
import { accessRefreshTokenAndCookieSetter } from "@/utils";
import { successResponse } from "@/utils/response";
export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found. Please login"));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return next(createError(400, "Invalid credentials"));
    }
    const data = {
      user: {
        _id: user._id as Types.ObjectId,
        email: user.email,
        role: user.role,
      },
      res,
      next,
    };

    await accessRefreshTokenAndCookieSetter(data);

    successResponse(res, {
      message: "Logged in successfully",
      payload: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
