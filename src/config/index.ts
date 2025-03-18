import "dotenv/config";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const PORT = process.env.PORT || 4000;
const dbURL =
  process.env.dbURL || "mongodb://localhost:27017/backendTemplateDB";

const jwt_access_exp = process.env.JWT_ACCESS_EXP || "1h";
const jwt_access_secret =
  process.env.JWT_ACCESS_SEC || "dfdsfdsfdsfdsfdsfdsdfdsfdsfsdf";

const jwt_refresh_exp = process.env.JWT_REFRESH_EXP || "30d";
const jwt_refresh_secret =
  process.env.JWT_REFRESH_SEC || "dfdsfdsfdsfdsfdsfdsfdsf";

const process_signup_exp = process.env.PROCESS_SIGN_UP_EXP || "10m";
const process_signup_sec =
  process.env.PROCESS_SIGN_UP_SEC || "dfdsfdsfdsfdsfsddfdsfds";

const smtp_username = process.env.smtp_username || "joy600508@gmail.com";
const smtp_password = process.env.smtp_password || "your-password";

const client_url = process.env.CLIENT_URL || "http://localhost:3000";

const jwt_password_reset_exp = process.env.JWT_PASSWORD_RESET_EXP || "10m";
const jwt_password_reset_secret =
  process.env.JWT_PASSWORD_RESET_SEC || "dfjldsfjlkdsfjdslfdsf";

export {
  PORT,
  createError,
  dbURL,
  jwt_access_exp,
  jwt_access_secret,
  jwt_refresh_exp,
  jwt_refresh_secret,
  process_signup_exp,
  process_signup_sec,
  smtp_username,
  smtp_password,
  client_url,
  jwt_password_reset_exp,
  jwt_password_reset_secret,
  bcrypt,
  jwt,
};
