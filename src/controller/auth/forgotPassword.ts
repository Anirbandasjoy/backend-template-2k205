import {
  createError,
  jwt_password_reset_exp,
  jwt_password_reset_secret,
} from "@/config";
import User from "@/models/user.model";
import sendingEmail from "@/services/email";
import { resetPasswordEmail } from "@/services/email/emailTemplate/resetPasswordTemplate";
import { createToken } from "@/utils";
import { successResponse } from "@/utils/response";
import { Response, Request, NextFunction } from "express";

export const handleForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email: email });
    if (!userData) {
      return next(createError(409, "User not found, please register first"));
    }

    const token = createToken(
      { email },
      jwt_password_reset_secret,
      jwt_password_reset_exp
    );

    if (!token) {
      throw createError(401, "Not Generate Token");
    }

    const emailData = {
      email,
      subject: "Forgot Your Password",
      html: resetPasswordEmail(email, token),
    };

    try {
      await sendingEmail(emailData);
    } catch (error) {
      console.log(error);
      next(error);
    }
    return successResponse(res, {
      statusCode: 200,
      message: `please go to your ${email} for  complete your password reset  process `,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};
