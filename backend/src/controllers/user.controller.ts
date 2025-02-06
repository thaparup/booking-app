import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model";
import { Request, Response } from "express";
import { userZodSchema } from "../zod_schema/user_zod_schema";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../constants";
import { ApiError } from "../utils/Apierror";

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const validatedData = userZodSchema.parse(req.body);

    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User(validatedData);
    await newUser.save();

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET environment variable is not set");
    }

    const token = jwt.sign(
      { userId: newUser.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, cookieOptions);
    res
      .status(201)
      .json(new ApiResponse(201, "User registered successfully!", {}));
  }
);

export { registerUser };
