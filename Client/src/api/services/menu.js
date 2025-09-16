import api from "../api";

export const fetchCategories = async () => {
  const response = await api.get(`/v2/menu/categories/`);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await api.get(`/v2/menu/items/`);
  return response.data;
};
