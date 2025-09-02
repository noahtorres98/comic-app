"use client";

import { useState } from "react";
import ComicCard from "@/components/ComicCard";
import comicsData from "@/data/comics.json";
import { Button } from "@/components/ui/button";
import SmallLink from "@/components/SmallLink";

export default function Home() {
  const [comics, setComics] = useState(comicsData);

  // Compute stats
  const totalSeries = comics.length;
  const totalIssues = comics.reduce(
    (sum, series) => sum + series.issues.length,
    0
  );
  const recentAdditions = comics.slice(-3); // last 3 series added

  return (
    <>
      <main className="max-h-screen p-8 bg-[var(--color-bg)] text-[var(--color-foreground)]">
        {/* Hero Banner */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-2">My Comic Library</h1>
          <p className="text-lg text-[var(--color-accent)]">
            Track, explore, and enjoy your comics.
          </p>
          <SmallLink href="/search">Go to Search</SmallLink>
        </section>

        {/* Stats */}
        <section className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-[#1A1A1A] rounded-lg shadow-lg">
            <div className="text-2xl font-bold">{totalSeries}</div>
            <div>Total Series</div>
          </div>
          <div className="p-6 bg-[#1A1A1A] rounded-lg shadow-lg">
            <div className="text-2xl font-bold">{totalIssues}</div>
            <div>Total Issues</div>
          </div>
          <div className="p-6 bg-[#1A1A1A] rounded-lg shadow-lg">
            <div className="text-2xl font-bold">{recentAdditions.length}</div>
            <div>Recent Additions</div>
          </div>
        </section>

        {/* Featured / Recent Series */}
        {/* <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Series</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentAdditions.map((series) => (
              <ComicCard
                key={series.id}
                title={series.title}
                cover={series.cover}
                href={`/library/${series.id}`}
              />
            ))}
          </div>
        </section> */}
      </main>
    </>
  );
}
