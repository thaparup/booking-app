export const DB_NAME: string = "booking-app";
export const requestBodySize: string = "16kb";
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.Node_ENV === "production",
  maxAge: 86400000,
};
