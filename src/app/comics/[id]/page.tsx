import comics from "@/data/comics.json";
import Link from "next/link";

interface ReaderProps {
  params: { id: string; page: string };
}

export default function Reader({ params }: ReaderProps) {
  const comic = comics.find((c) => c.id === params.id);
  if (!comic) return <div className="page-container">Comic not found.</div>;

  const currentPage = parseInt(params.page);
  const totalPages = comic.pages.length;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      {/* Comic page image */}
      <img
        src={comic.pages[currentPage - 1]}
        alt={`Page ${currentPage}`}
        className="max-h-[90vh] object-contain rounded-lg shadow-lg"
      />

      {/* Navigation */}
      <div className="flex gap-4 mt-6">
        {prevPage && (
          <Link
            href={`/comics/${comic.id}/read/${prevPage}`}
            className="btn-secondary"
          >
            Previous
          </Link>
        )}
        {nextPage && (
          <Link
            href={`/comics/${comic.id}/read/${nextPage}`}
            className="btn-primary"
          >
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
