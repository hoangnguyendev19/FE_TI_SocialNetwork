import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { postApi } from "api";
import { QueryKey } from "constants";

export const usePost = (options?: Omit<UseInfiniteQueryOptions<any>, "queryKey" | "queryFn" | "getNextPageParam">) => {
  return useInfiniteQuery({
    ...options,
    queryKey: [QueryKey.POST],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await postApi.getPosts({
        page: pageParam,
        size: 10,
        sortField: "createdAt",
        sortBy: "DESC",
        filter: {},
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.page.number;
      const totalPages = lastPage.page.totalPages;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
