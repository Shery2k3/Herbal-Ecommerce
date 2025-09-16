import { useQuery } from "@tanstack/react-query";
import { fetchAreas, fetchCities } from "../services/area";

export const useAreas = (cityId) => {
  return useQuery({
    queryKey: ["areas", cityId],
    queryFn: () => fetchAreas(cityId),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    enabled: !!cityId, // Only fetch when cityId is provided
  });
};

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
