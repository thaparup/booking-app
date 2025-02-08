import { TypeHotelZodSchema } from "../../../backend/src/zod_schema/hotel_zod_schema";

type FetchMyHotelsResponseObject = {
  data: {
    hotels: TypeHotelZodSchema[];
  };
  messsage: string;
  statusCode: number;
  success: boolean;
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
