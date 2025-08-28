import comics from "@/data/comics.json";
import Link from "next/link";

interface ComicProps {
  params: { id: string };
}

export default function ComicDetail({ params }: ComicProps) {
  const comic = comics.find((c) => c.id === params.id);

  if (!comic) return <div className="page-container">Comic not found.</div>;

  return (
    <main className="page-container">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cover image */}
        <img src={comic.cover} alt={comic.title} className="w-64 comic-img" />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{comic.title}</h1>
          <p className="text-[color:var(--color-text-muted)]">
            {comic.genre} • {comic.year}
          </p>
          <p className="mt-4 text-lg">{comic.description}</p>

          {/* Start reading button */}
          <Link
            href={`/comics/${comic.id}/read/1`}
            className="btn-primary mt-6"
          >
            Start Reading
          </Link>
        </div>
      </div>
    </main>
  );
}
