import { Router } from "express";
import { getHotels } from "../controllers/hotels.controller";

const router = Router();

router.route("/search").get(getHotels);

export { router };
