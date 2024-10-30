import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { roomApi } from "api/roomApi";
import { PostQueryRequest, QueryKey } from "constants";

export const useRoom = (
  options?: Omit<UseInfiniteQueryOptions<any>, "queryKey" | "queryFn" | "getNextPageParam">,
  postQueryRequest?: PostQueryRequest,
) => {
  return useInfiniteQuery({
    ...options,
    queryKey: [QueryKey.ROOM, postQueryRequest],
    queryFn: async () => {
      const response = await roomApi.getRooms({
        ...postQueryRequest,
        page: postQueryRequest?.page ?? 1,
        size: postQueryRequest?.size ?? 6,
        sortField: postQueryRequest?.sortField ?? "createdAt",
        sortBy: postQueryRequest?.sortBy ?? "DESC",
        filter: postQueryRequest?.filter ?? {},
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.number + 1;
      const totalPages = lastPage.page.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
