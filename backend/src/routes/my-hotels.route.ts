import { Router } from "express";
import { myhotels } from "../controllers/my-hotels.controller";
import { uploadImage } from "../middleware/imageFiles";
import { verifyToken } from "../middleware/auth";

const router = Router();

router
  .route("/")
  .post(verifyToken, uploadImage().array("imageFiles"), myhotels);

export { router };
