import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { v2 as cloudinary } from "cloudinary";
import { hotelZodSchema } from "../zod_schema/hotel_zod_schema";
import Hotel from "../models/hotel";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodError } from "zod";

const myhotels = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    console.log(req.files);
    console.log(req.body.facilities);
    req.body.userId = req.userId!;
    req.body.starRating = parseFloat(req.body.starRating);
    req.body.adultCount = parseFloat(req.body.adultCount);
    req.body.childCount = parseFloat(req.body.childCount);
    req.body.pricePerNight = parseFloat(req.body.pricePerNight);
    req.body.lastUpdated = new Date();
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ message: "No images provided" });
    }
    try {
      const uploadPromises = req.files.map((file: Express.Multer.File) =>
        cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
        })
      );

      const responses = await Promise.all(uploadPromises);
      req.body.imageUrls = responses.map((res) => res.secure_url);
      const validatedData = hotelZodSchema.safeParse(req.body);
      console.log(validatedData.data);
      console.log(validatedData.error);
      console.log(validatedData.success);
      if (
        validatedData.success === false &&
        validatedData.error instanceof ZodError
      ) {
        return res.status(400).json({
          message: "empty field",
          errors: validatedData.error.errors.map((item) => item.message),
        });
      }
      const newHotel = new Hotel(validatedData.data);
      await newHotel.save();

      return res
        .status(200)
        .json(new ApiResponse(200, "New hotel added", { hotel: newHotel }));
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

export { myhotels };
