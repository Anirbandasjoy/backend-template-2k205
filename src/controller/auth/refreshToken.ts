import {
  createError,
  jwt,
  jwt_access_exp,
  jwt_access_secret,
  jwt_refresh_secret,
} from "@/config";
import { createToken, setAccessTokenCookie } from "@/utils";
import { successResponse } from "@/utils/response";
import { Response, Request, NextFunction } from "express";

export const handelRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;
    const decodedToken = jwt.verify(oldRefreshToken, jwt_refresh_secret);
    if (typeof decodedToken !== "object" || !decodedToken.user) {
      throw createError(400, "Invalid refresh token. Please loginIn");
    }

    const accessToken = createToken(
      {
        user: decodedToken?.user,
      },
      jwt_access_secret,
      jwt_access_exp
    );

    if (!accessToken) {
      return next(
        createError(401, "Something was wrong not created access token")
      );
    }

    setAccessTokenCookie(res, accessToken);
    successResponse(res, {
      statusCode: 200,
      message: "New access token is Generated",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
