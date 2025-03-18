import { IUser } from "@/types/user.interface";
import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },

  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
