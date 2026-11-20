import { NextResponse } from "next/server";
import type { ComicSearchResponse, ComicSearchResult } from "@/types/comic";

const LIMIT = 20;
const MAX_QUERY_LENGTH = 200;
// Cache upstream responses to stay well under Comic Vine's rate limits.
const REVALIDATE_SECONDS = 60 * 60;

type ComicVineVolume = {
  id: number;
  name?: string | null;
  image?: { original_url?: string | null } | null;
  publisher?: { name?: string | null } | null;
  start_year?: string | null;
  person_credits?: { name: string }[] | null;
};

type ComicVineSearchResponse = {
  status_code: number;
  error: string;
  number_of_total_results: number;
  results?: ComicVineVolume[];
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = (url.searchParams.get("query") ?? "").trim();
  const pageParam = url.searchParams.get("page") ?? "1";

  if (!/^\d{1,5}$/.test(pageParam) || Number(pageParam) < 1) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }
  if (!query || query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const page = Number(pageParam);
  const offset = (page - 1) * LIMIT;

  const apiKey = process.env.COMIC_VINE_KEY;

  if (!apiKey)
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });

  try {
    const res = await fetch(
      `https://comicvine.gamespot.com/api/search/?api_key=${encodeURIComponent(apiKey)}&format=json&resources=volume&query=${encodeURIComponent(
        query,
      )}&limit=${LIMIT}&offset=${offset}`,
      {
        headers: { "User-Agent": "MyComicApp" },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch: ${res.status}` },
        { status: 502 },
      );
    }

    const data: ComicVineSearchResponse = await res.json();

    // Comic Vine reports errors in the body with HTTP 200 (1 = OK).
    if (data.status_code !== 1) {
      return NextResponse.json({ error: "Failed to fetch" }, { status: 502 });
    }

    const results: ComicSearchResult[] = (data.results ?? []).map((comic) => ({
      id: comic.id,
      title: comic.name || "",
      cover: comic.image?.original_url || "",
      publisher: comic.publisher?.name || "",
      start_year: comic.start_year || "",
      authors: comic.person_credits?.map((a) => a.name) || [],
    }));

    const hasMore = offset + LIMIT < data.number_of_total_results;

    const body: ComicSearchResponse = {
      results,
      nextPage: hasMore ? page + 1 : null,
    };
    return NextResponse.json(body);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
