import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "../services/menu";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
