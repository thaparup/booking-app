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
