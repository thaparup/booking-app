import { RegisterFormData } from "../pages/Register";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`/api/v1/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  console.log(responseBody);

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const fetchCurrentUser = async () => {
  const response = await fetch(`/api/v1/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};
