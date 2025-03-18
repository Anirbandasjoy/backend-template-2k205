import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { errorResponse } from "./utils/response";
import { createError } from "./config";
import cors from "cors";
import cookieParser from "cookie-parser";

import rateLimit from "express-rate-limit";
import rootRouter from "./routers";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

app.use(
  cors({
    origin: process.env.CORS_ORIGINS || "http://localhost:3000",
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// XSS protection: sanitize user input

app.get("/", (_req: Request, res: Response) => {
  res.send("backend template 2025");
});

app.use("/api/v1", rootRouter);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  return next(createError(404, "route not found"));
});

app.use(((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.status || 500;
  let message = err.message || "An unexpected error occurred";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Invalid ID format: ${err.value}. Please provide a valid ObjectId.`;
  }
  errorResponse(res, { statusCode, message, payload: { err } });
}) as unknown as ErrorRequestHandler);

export default app;
