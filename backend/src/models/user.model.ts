import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TypeUserZodSchema } from "../zod_schema/user_zod_schema";

const userSchema = new Schema<TypeUserZodSchema>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      console.log(error);
      next();
    }
  }
  next();
});

export const User = mongoose.model<TypeUserZodSchema>("User", userSchema);
