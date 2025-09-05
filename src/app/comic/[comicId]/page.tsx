interface Props {
  params: { comicId: string };
}

export default async function ComicDetail({ params }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/comics/${params.comicId}`, {
    cache: "no-store",
  });

  const comic = await res.json();

  if (!comic) return <p>Comic not found</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{comic.name}</h1>
      <img
        src={comic.image?.original_url}
        alt={comic.name}
        className="mb-4 h-96"
      />
      <p>Publisher: {comic.publisher?.name}</p>
      <p>Start Year: {comic.start_year}</p>
    </div>
  );
}
