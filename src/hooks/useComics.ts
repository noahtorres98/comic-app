import { useInfiniteQuery } from "@tanstack/react-query";
import type { ComicSearchResponse } from "@/types/comic";

async function getComics(
  search: string,
  page: number,
): Promise<ComicSearchResponse> {
  const res = await fetch(
    `/api/comics/search?query=${encodeURIComponent(search)}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch comics");

  return await res.json();
}

export function useComicSearch(search: string) {
  const query = search.trim();
  return useInfiniteQuery({
    queryKey: ["comics", query],
    queryFn: ({ pageParam }) => getComics(query, pageParam),

    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
    enabled: !!query, // only fetch if search is not empty
    initialPageParam: 1,
  });
}
