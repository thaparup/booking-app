import { TypeHotelZodSchema } from "../../../backend/src/zod_schema/hotel_zod_schema";

type FetchMyHotelsResponseObject = {
  data: {
    hotels: TypeHotelZodSchema[];
  };
  messsage: string;
  statusCode: number;
  success: boolean;
};

type HotelSearchResponse = {
  data: TypeHotelZodSchema[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`/api/v1/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<FetchMyHotelsResponseObject> => {
  const response = await fetch(`/api/v1/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<any> => {
  const response = await fetch(`/api/v1/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  console.log("from api ", hotelFormData);
  const response = await fetch(`/api/v1/my-hotels/67a75fbbc0767158a75cbded`, {
    method: "PUT",
    body: hotelFormData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(`/api/v1/hotels/search?${queryParams}`);

  if (!response.ok) {
    throw new Error("Error fetching hotels using query params");
  }

  return response.json();
};
