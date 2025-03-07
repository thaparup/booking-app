import Hotel from "../models/hotel";
import { asyncHandler } from "../utils/asyncHandler";
import { Response, Request } from "express";
import { TypeHotelZodSchema } from "../zod_schema/hotel_zod_schema";

type HotelSearchResponse = {
  data: TypeHotelZodSchema[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

const getHotels = asyncHandler(async (req: Request, res: Response) => {
  const query = constructSearchQuery(req.query);

  let sortOptions = {};
  switch (req.query.sortOption) {
    case "starRating":
      sortOptions = { starRating: -1 };
      break;
    case "pricePerNightAsc":
      sortOptions = { pricePerNight: 1 };
      break;
    case "pricePerNightDesc":
      sortOptions = { pricePerNight: -1 };
      break;
  }

  const pageSize = 5; //number of hotels
  const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
  const skip = (pageNumber - 1) * pageSize;
  const hotels = await Hotel.find().skip(skip).limit(pageSize);
  const total = await Hotel.countDocuments();

  const response: HotelSearchResponse = {
    data: hotels,
    pagination: {
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
    },
  };
  res.json(response);
});

const getHotelDetail = async (req: Request, res: Response): Promise<any> => {
  if (!req.params.hotelId) {
    return res.status(400).json({ message: "Hotel ID is required" });
  }

  const hotel = await Hotel.findById(req.params.hotelId);
  res.json(hotel);
};

export { getHotels, getHotelDetail };
