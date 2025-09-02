import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("query") || "";

  const apiKey = process.env.COMIC_VINE_KEY;
  if (!apiKey)
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });

  try {
    const res = await fetch(
      `https://comicvine.gamespot.com/api/search/?api_key=${apiKey}&format=json&resources=volume&query=${encodeURIComponent(
        query
      )}`,
      { headers: { "User-Agent": "MyComicApp" } }
    );
    const data = await res.json();

    const results = (data.results || []).map((comic: any) => ({
      id: comic.id,
      title: comic.name,
      cover: comic.image?.original_url,
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
