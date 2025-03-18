import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

import { Types } from "mongoose";
import {
  createError,
  jwt_access_exp,
  jwt_access_secret,
  jwt_refresh_exp,
  jwt_refresh_secret,
} from "@/config";

export const createToken = (
  payload: any,
  secretKey: string,
  expiresIn: string | any
): string => {
  if (
    typeof payload !== "object" ||
    payload === null ||
    Array.isArray(payload)
  ) {
    throw new Error("Payload must be a non-empty object");
  }

  if (typeof secretKey !== "string" || secretKey.trim().length === 0) {
    throw new Error("SecretKey must be a non-empty string");
  }
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Failed to sign in JWT:", error);
    throw error;
  }
};

// cookie setter

export const setAccessTokenCookie = (
  res: Response,
  accessToken: string
): void => {
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });
  } catch (error) {
    console.error("Error setting cookie:", error);
    throw new Error("Failed to set cookie");
  }
};

export const setRefreshTokenCookie = (
  res: Response,
  refreshToken: string
): void => {
  try {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error("Error setting cookie:", error);
    throw new Error("Failed to set cookie");
  }
};

interface userTypes {
  _id: Types.ObjectId;
  email: string;
  role: string;
}

interface IAccessRefreshTokenAndCookieSetter {
  user: userTypes;
  res: Response;
  next: NextFunction;
}

export const accessRefreshTokenAndCookieSetter = async (
  data: IAccessRefreshTokenAndCookieSetter
): Promise<any> => {
  try {
    const accessToken = createToken(
      {
        user: {
          _id: data.user._id,
          email: data.user.email,
          role: data.user.role,
        },
      },
      jwt_access_secret,
      jwt_access_exp
    );
    if (!accessToken) {
      return data.next(createError(401, "not created accessToken"));
    }
    setAccessTokenCookie(data.res, accessToken);

    const refreshToken = createToken(
      {
        user: {
          _id: data.user._id,
          email: data.user.email,
          role: data.user.role,
        },
      },
      jwt_refresh_secret,
      jwt_refresh_exp
    );

    if (!refreshToken) {
      return data.next(createError(401, "not created refreshToken"));
    }
    setRefreshTokenCookie(data.res, refreshToken);
  } catch (error) {
    console.log(error);
  }
};
