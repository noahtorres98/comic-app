import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const apiKey = process.env.COMIC_VINE_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });
    }

    // Get query params
    const { searchParams } = new URL(req.url);
    const series = searchParams.get("series") || "";
    const author = searchParams.get("author") || "";

    let query = "";
    if (series) query += series;
    if (author) query += ` ${author}`;

    if (!query) {
      return NextResponse.json([], { status: 200 }); // empty array if nothing to search
    }

    // Call ComicVine API
    const res = await fetch(
      `https://comicvine.gamespot.com/api/search/?api_key=${apiKey}&format=json&resources=volume&query=${encodeURIComponent(
        query
      )}`,
      {
        headers: { "User-Agent": "MyComicApp" },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `ComicVine fetch failed: ${res.status}` },
        { status: 500 }
      );
    }

    const data = await res.json();

    const results = (data.results ?? []).map((comic: any) => ({
      id: comic.id,
      title: comic.name,
      cover: comic.image?.original_url || "",
      publisher: comic.publisher?.name || "",
      start_year: comic.start_year || "",
      authors: comic.person_credits?.map((a: any) => a.name) || [],
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch comics" },
      { status: 500 }
    );
  }
}
