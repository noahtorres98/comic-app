import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { comicId: string } }
) {
  try {
    const apiKey = process.env.COMIC_VINE_KEY;
    if (!apiKey)
      return NextResponse.json({ error: "Missing API key" }, { status: 500 });

    const { comicId } = params;

    const res = await fetch(
      `https://comicvine.gamespot.com/api/volume/4050-${comicId}/?api_key=${apiKey}&format=json`,
      {
        headers: { "User-Agent": "MyComicApp" },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch comic: ${res.status}` },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json(data.results);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch comic" },
      { status: 500 }
    );
  }
}
