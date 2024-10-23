import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { postApi } from "api";
import { PostQueryRequest, QueryKey } from "constants";

export const useShare = (
  options?: Omit<UseInfiniteQueryOptions<any>, "queryKey" | "queryFn" | "getNextPageParam">,
  postQueryRequest?: PostQueryRequest,
) => {
  return useInfiniteQuery({
    ...options,
    queryKey: [QueryKey.SHARE, postQueryRequest],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await postApi.getShares({
        ...postQueryRequest,
        page: pageParam,
        size: postQueryRequest?.size ?? 10,
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
