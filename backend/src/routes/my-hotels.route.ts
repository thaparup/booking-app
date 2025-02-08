import { Router } from "express";
import {
  fetchMyHotelById,
  fetchMyHotels,
  addHotel,
  updateHotel,
} from "../controllers/my-hotels.controller";
import { uploadImage } from "../middleware/imageFiles";
import { verifyToken } from "../middleware/auth";

const router = Router();

router
  .route("/")
  .post(verifyToken, uploadImage().array("imageFiles"), addHotel);

router.route("/").get(verifyToken, fetchMyHotels);
router.route("/:id").get(verifyToken, fetchMyHotelById);
router
  .route("/:hotelId")
  .put(verifyToken, uploadImage().array("imageFiles"), updateHotel);
export { router };
