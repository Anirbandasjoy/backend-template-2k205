import { createError } from "@/config";
import mongoose from "mongoose";

export const userExistByEmail = async (email: string, Model: any) => {
  try {
    const userExist = await Model.exists({ email });
    if (userExist) {
      throw createError(409, "User Already Exist");
    }
    return userExist;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "invalid Email  ");
    }
    throw error;
  }
};
