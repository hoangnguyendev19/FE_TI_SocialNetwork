import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { boardingHouseApi } from "api";
import { QueryKey } from "constants";

export const useBoardingHouse = (options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">) => {
  return useQuery<any>({
    ...options,
    queryKey: [QueryKey.BOARDING_HOUSE],
    queryFn: boardingHouseApi.getBoardingHouse,
  });
};
