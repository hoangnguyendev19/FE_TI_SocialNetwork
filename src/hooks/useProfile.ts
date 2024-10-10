import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { userApi } from "api";
import { QueryKey, User } from "constants";

export const useProfile = (
  options?: Omit<UseQueryOptions<User>, "queryKey" | "queryFn">
) => {
  return useQuery<User>({
    ...options,
    queryKey: [QueryKey.AUTH],
    queryFn: userApi.getProfile,
  });
};
