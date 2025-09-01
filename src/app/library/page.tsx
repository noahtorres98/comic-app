"use client";

import ComicCard from "@/components/ComicCard";
import comicsData from "@/data/comics.json";

export default function Library() {
  return (
    <main className="min-h-screen p-8 bg-[var(--color-bg)] text-[var(--color-foreground)]">
      <h1 className="text-3xl font-bold mb-6">My Library</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {comicsData.map((series) => (
          <ComicCard
            key={series.id}
            title={series.title}
            cover={series.cover}
            href={`/library/${series.id}`}
          />
        ))}
      </div>
    </main>
  );
}
