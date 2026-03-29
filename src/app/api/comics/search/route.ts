import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query") || "";
  const page = Number(url.searchParams.get("page") || "1");

  const limit = 20;
  const offset = (page - 1) * limit;

  const apiKey = process.env.COMIC_VINE_KEY;

  if (!apiKey)
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });

  try {
    debugger;

    console.log("PAGE " + page);
    console.log("OFFSET " + offset);
    const res = await fetch(
      `https://comicvine.gamespot.com/api/search/?api_key=${apiKey}&format=json&resources=volume&query=${encodeURIComponent(
        query,
      )}&limit=${limit}&offset=${offset}`,
      { headers: { "User-Agent": "MyComicApp" } },
    );
    const data = await res.json();

    const results = (data.results ?? []).map((comic: any) => ({
      id: comic.id,
      title: comic.name,
      cover: comic.image?.original_url || "",
      publisher: comic.publisher?.name || "",
      start_year: comic.start_year || "",
      authors: comic.person_credits?.map((a: any) => a.name) || [],
    }));

    const hasMore = offset + limit < data.number_of_total_results;

    return NextResponse.json({ results, nextPage: hasMore ? page + 1 : null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
