import { createError, bcrypt } from "@/config";
import User from "@/models/user.model";
import { findWithId } from "@/services";
import { successResponse } from "@/utils/response";
import { Response, Request, NextFunction } from "express";

export const handleUpdatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return next(createError(403, "User not authenticated"));
    }
    const { oldPassword, newPassword, confirmPassword } = req.body;

    const user = await findWithId(req?.user?._id, User);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const matchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!matchPassword) {
      return next(createError(400, "Old password in incorrect"));
    }
    if (newPassword !== confirmPassword) {
      return next(
        createError(403, "newPassword and confirm password don't match")
      );
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();
    successResponse(res, {
      message: "Successfully updated password",
    });
  } catch (error) {
    next(error);
  }
};
