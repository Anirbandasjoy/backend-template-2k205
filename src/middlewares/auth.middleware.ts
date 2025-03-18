import { createError, jwt_access_secret } from "@/config";
import { Response, Request, NextFunction, CookieOptions } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return next(createError(401, "Access token not found, please loggedIn"));
    }
    const decode = jwt.verify(accessToken, jwt_access_secret) as JwtPayload;
    if (!decode) {
      return next(createError(401, "Invalid token"));
    }
    if (!(decode as any).user) {
      return next(createError(401, "Token does not contain user information"));
    }

    if (decode.user.isBanned) {
      const cookieOptions: CookieOptions = {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
      };
      res.clearCookie("accessToken", cookieOptions);
      res.clearCookie("refreshToken", cookieOptions);
      return next(createError(401, "User is banned"));
    }

    req.user = (decode as any).user;
    next();
  } catch (error) {
    next(error);
  }
};

export const isLogOut = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      return next(createError(401, "User already logged in"));
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (req.user) {
      if (req.user.role !== "admin") {
        return next(createError(403, "Forbidden access"));
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
