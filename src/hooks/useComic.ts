import { useQuery } from "@tanstack/react-query";

async function getComic(comicId: string) {
  const res = await fetch(`/api/comics/${comicId}`);
  if (!res.ok) throw new Error("Failed to fetch comics");
  let response = res.json();
  return response;
}

export function useComic(comicId: string) {
  return useQuery({
    queryKey: ["comic", comicId],
    queryFn: () => getComic(comicId),
  });
}
