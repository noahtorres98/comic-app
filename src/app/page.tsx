"use client";

import Navbar from "@/components/Navbar";
import ComicCard from "@/components/ComicCard";
import comics from "@/data/comics.json";

export default function Home() {
  return (
    <>
      <main className="min-h-screen p-8 pt-[var(--nav-height)]">
        <h1 className="text-3xl font-bold mb-6">My Comic Library</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {comics.map((series) => (
            <ComicCard
              key={series.id}
              title={series.title}
              cover={series.cover}
              href={`/comics/${series.id}`} // links to series page
            />
          ))}
        </div>
      </main>
    </>
  );
}
