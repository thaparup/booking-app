import { INVALID, z } from "zod";

const userZodSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().nonempty({ message: "Password is required" }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
});

const loginZodSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

type TypeUserZodSchema = z.infer<typeof userZodSchema>;
type TypeLoginZodSchema = z.infer<typeof loginZodSchema>;

export {
  userZodSchema,
  loginZodSchema,
  type TypeUserZodSchema,
  type TypeLoginZodSchema,
};
