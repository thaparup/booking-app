import express from "express";
import { requestBodySize } from "./constants";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: requestBodySize }));
app.use(express.urlencoded({ extended: true, limit: requestBodySize }));
app.use(express.static("public"));

//routes

import { router as userRouter } from "./routes/user.route";
import { router as authRouter } from "./routes/auth.route";
import { router as myHotelsRouter } from "./routes/my-hotels.route";
import { router as hotelRouter } from "./routes/hotels.route";

//user
app.use("/api/v1/user", userRouter);

// auth
app.use("/api/v1/auth", authRouter);

// my-hotels
app.use("/api/v1/my-hotels", myHotelsRouter);

// hotels
app.use("/api/v1/hotels", hotelRouter);

export { app };
