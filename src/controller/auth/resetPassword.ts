import { createError, jwt, jwt_password_reset_secret, bcrypt } from "@/config";
import User from "@/models/user.model";
import { successResponse } from "@/utils/response";
import { Response, Request, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";

export const handleResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { token, password } = req.body;

    const decoded = jwt.verify(token, jwt_password_reset_secret) as JwtPayload;
    if (!decoded) {
      return next(createError(401, "Invalid token or expired token"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const filter = { email: decoded.email };
    const update = { password: hashedPassword };
    const option = { new: true };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);

    if (!updatedUser) {
      return next(createError(403, "Password reset failed"));
    }

    successResponse(res, {
      statusCode: 200,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};
