import { z } from "zod";

const bookingZodSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  adultCount: z.number().min(1, { message: "At least one adult is required" }),
  childCount: z.number().min(0, { message: "Child count cannot be negative" }),
  checkIn: z.date(),
  checkOut: z.date(),
  userId: z.string().min(1, { message: "User ID is required" }),
  totalCost: z.number().min(0, { message: "Total cost must be at least 0" }),
});

type TypeBookingZodSchema = z.infer<typeof bookingZodSchema>;
export { bookingZodSchema, type TypeBookingZodSchema };
