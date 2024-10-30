import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { roomApi } from "api";
import { QueryKey } from "constants";

export const useRoomDetail = (options?: Omit<UseQueryOptions<any>, "queryKey" | "queryFn">, id?: string) => {
  return useQuery<any>({
    ...options,
    queryKey: [QueryKey.ROOM, id],
    queryFn: () => roomApi.getDetail(id as string),
  });
};
