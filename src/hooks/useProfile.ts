import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { userApi } from "api";
import { QueryKey } from "constants";

export const useProfile = (
  options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">
) => {
  return useQuery<any>({
    ...options,
    queryKey: [QueryKey.AUTH],
    queryFn: userApi.getProfile,
  });
};
