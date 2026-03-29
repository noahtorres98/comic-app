import { useInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";

async function getComics(search: string, page: number) {
  debugger;
  const res = await fetch(
    `/api/comics/search?query=${encodeURIComponent(search)}&page=${page}`,
  );
  if (!res.ok) throw new Error("Failed to fetch comics");

  return await res.json();
}

export function useComicSearch(search: string) {
  return useInfiniteQuery({
    queryKey: ["comics", search],
    queryFn: ({ pageParam = 1 }) => getComics(search, pageParam),

    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
    enabled: !!search, // only fetch if search is not empty
    initialPageParam: 1,
  });
}
