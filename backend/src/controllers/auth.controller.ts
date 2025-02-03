import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model";
import { Request, Response } from "express";
import { loginZodSchema } from "../zod_schema/user_zod_schema";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../constants";
import bcrypt from "bcrypt";
import { ZodError } from "zod";

const login = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const validatedData = loginZodSchema.safeParse(req.body);

    if (
      validatedData.success === false &&
      validatedData.error instanceof ZodError
    ) {
      return res.status(400).json({
        message: "empty field",
        errors: validatedData.error.errors.map((item) => item.message),
      });
    }
    const user = await User.findOne({ email: validatedData.data?.email });
    if (!user) {
      return res
        .status(201)
        .json(new ApiResponse(201, "Invalid Credentials!", {}));
    }
    const isMatch = await bcrypt.compare(
      validatedData.data?.password!,
      user.password
    );
    if (!isMatch) {
      return res
        .status(201)
        .json(new ApiResponse(201, "Invalid Credentials!", {}));
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("auth_token", token, cookieOptions);
    res
      .status(201)
      .json(
        new ApiResponse(201, "User logged in successfully!", {
          userId: user._id,
        })
      );
  }
);

export { login };
