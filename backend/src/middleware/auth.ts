import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express" {
  interface Request {
    userId?: string | null;
  }
}

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies?.auth_token;
    console.log("token", token);
    if (!token) {
      // req.userId = null;
      // return next();
      return res.status(401).json({ message: "unauthorized" });
    }

    const decodedToken: string | JwtPayload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || ""
    );

    if (!decodedToken || typeof decodedToken === "string") {
      return res.status(401).json({ message: "unauthorized" });
    }

    req.userId = (decodedToken as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export { verifyToken };
