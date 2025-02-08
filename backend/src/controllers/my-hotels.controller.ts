import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { v2 as cloudinary } from "cloudinary";
import { hotelZodSchema } from "../zod_schema/hotel_zod_schema";
import Hotel from "../models/hotel";
import { ApiResponse } from "../utils/ApiResponse";
import { ZodError } from "zod";

const addHotel = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
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

const updateHotel = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { hotelId } = req.params;
    console.log(hotelId);
    if (!hotelId) {
      return res.status(400).json({ message: "Hotel ID is required" });
    }

    req.body.userId = req.userId!;

    if (req.body.starRating)
      req.body.starRating = parseFloat(req.body.starRating);
    if (req.body.adultCount)
      req.body.adultCount = parseFloat(req.body.adultCount);
    if (req.body.childCount)
      req.body.childCount = parseFloat(req.body.childCount);
    if (req.body.pricePerNight)
      req.body.pricePerNight = parseFloat(req.body.pricePerNight);

    req.body.lastUpdated = new Date();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    let uploadedImageUrls: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      try {
        const uploadPromises = req.files.map((file: Express.Multer.File) =>
          cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
          })
        );

        const responses = await Promise.all(uploadPromises);
        uploadedImageUrls = responses.map((res) => res.secure_url);
      } catch (uploadError) {
        return res.status(500).json({ message: "Error uploading images" });
      }
    }

    if (req.body.imageUrls && Array.isArray(req.body.imageUrls)) {
      req.body.imageUrls = [...req.body.imageUrls, ...uploadedImageUrls];
    } else {
      req.body.imageUrls = uploadedImageUrls;
    }

    const validatedData = hotelZodSchema.safeParse(req.body);
    if (
      validatedData.success === false &&
      validatedData.error instanceof ZodError
    ) {
      return res.status(400).json({
        message: "Validation error",
        errors: validatedData.error.errors.map((item) => item.message),
      });
    }

    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        validatedData.data,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedHotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      return res.status(200).json(
        new ApiResponse(200, "Hotel updated successfully", {
          hotel: updatedHotel,
        })
      );
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const fetchMyHotels = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const hotels = await Hotel.find({ userId: req.userId });

    if (hotels.length > 0) {
      return res
        .status(200)
        .json(new ApiResponse(200, "Hotels fetched successfully", { hotels }));
    } else {
      return res.status(404).json({ message: "No hotels found" });
    }
  }
);
const fetchMyHotelById = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id.toString();

    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, `Hotel deltail sent of ${id}`, { hotel }));
  }
);
const editHotelById = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const hotel = await Hotel.findOneAndUpdate({
      _id: req.params.hotelId,
      userId: req.userId,
    });
  }
);

export {
  addHotel,
  fetchMyHotels,
  fetchMyHotelById,
  editHotelById,
  updateHotel,
};
