import { Router } from "express";
import { getHotelDetail, getHotels } from "../controllers/hotels.controller";

const router = Router();

router.route("/search").get(getHotels);
router.route("/:hotelId").get(getHotelDetail);

export { router };
