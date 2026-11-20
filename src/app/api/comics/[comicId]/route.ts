import { NextResponse } from "next/server";

// Cache upstream responses to stay well under Comic Vine's rate limits.
const REVALIDATE_SECONDS = 60 * 60;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ comicId: string }> },
) {
  const { comicId } = await params;

  // Only allow numeric ids so the value can't alter the upstream URL path.
  if (!/^\d{1,10}$/.test(comicId)) {
    return NextResponse.json({ error: "Invalid comic id" }, { status: 400 });
  }

  const apiKey = process.env.COMIC_VINE_KEY;
  if (!apiKey)
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });

  try {
    const res = await fetch(
      `https://comicvine.gamespot.com/api/volume/4050-${comicId}/?api_key=${encodeURIComponent(apiKey)}&format=json`,
      {
        headers: { "User-Agent": "MyComicApp" },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch comic: ${res.status}` },
        { status: res.status === 404 ? 404 : 502 },
      );
    }

    const data = await res.json();

    // Comic Vine reports errors in the body with HTTP 200 (1 = OK, 101 = not found).
    if (data.status_code === 101) {
      return NextResponse.json({ error: "Comic not found" }, { status: 404 });
    }
    if (data.status_code !== 1) {
      return NextResponse.json(
        { error: "Failed to fetch comic" },
        { status: 502 },
      );
    }

    return NextResponse.json(data.results);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch comic" },
      { status: 500 },
    );
  }
}
