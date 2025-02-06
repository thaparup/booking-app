import { z } from "zod";
import { bookingZodSchema } from "./booking_zod_shema"; // Assuming you already have the bookingSchema imported

const hotelZodSchema = z.object({
  _id: z.string().min(1, { message: "Hotel ID is required" }),
  userId: z.string().min(1, { message: "User ID is required" }),
  name: z.string().min(1, { message: "Hotel name is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().min(1, { message: "Hotel type is required" }),
  adultCount: z.number().min(1, { message: "At least one adult is required" }),
  childCount: z.number().min(0, { message: "Child count cannot be negative" }),
  facilities: z
    .array(z.string())
    .nonempty({ message: "At least one facility is required" }),
  pricePerNight: z
    .number()
    .min(0, { message: "Price per night must be a number " }),
  starRating: z
    .number()
    .min(1)
    .max(5, { message: "Star rating must be between 1 and 5" }),
  imageUrls: z
    .array(z.string().url({ message: "Invalid image URL" }))
    .nonempty({ message: "At least one image URL is required" }),
  lastUpdated: z.date(),
  bookings: z.array(bookingZodSchema),
});

type TypeHotelZodSchema = z.infer<typeof hotelZodSchema>;
export { hotelZodSchema, type TypeHotelZodSchema };
