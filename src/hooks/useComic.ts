import { useQuery } from "@tanstack/react-query";
import type { ComicDetail } from "@/types/comic";

async function getComic(comicId: number): Promise<ComicDetail> {
  const res = await fetch(`/api/comics/${comicId}`);
  if (!res.ok) throw new Error("Failed to fetch comic");
  return res.json();
}

export function useComic(comicId: number | null) {
  return useQuery({
    queryKey: ["comic", comicId],
    queryFn: () => getComic(comicId as number),
    enabled: comicId != null,
  });
}
