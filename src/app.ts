import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import morgan from "morgan";
import { errorResponse, successResponse } from "./utils/response";
import { createError } from "./config";
import cors from "cors";
import cookieParser from "cookie-parser";
import rootRouter from "./routers";
import { splitStringToArray } from "./utils";
const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ORIGINS && splitStringToArray(process.env.ORIGINS),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// XSS protection: sanitize user input

app.get("/", (_req: Request, res: Response) => {
  successResponse(res, {
    message: "backend template 2025",
  });
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
