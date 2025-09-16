import api from "../api";

export const fetchAreas = async (cityId) => {
  const response = await api.get(`/v2/city/areas/${cityId}`);
  return response.data;
};

export const fetchCities = async () => {
  const response = await api.get("/v2/city/all");
  return response.data;
};
