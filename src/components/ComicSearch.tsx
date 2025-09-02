"use client";

import { useState } from "react";
import ComicCard from "./ComicCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComicSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResults([]); // clear previous results

    try {
      const res = await fetch(
        `/api/comics/search?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          placeholder="Search by series or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(6)].map((_, idx) => (
            <Skeleton key={idx} className="h-48 w-full rounded-md" />
          ))}
        </div>
      )}
      {/* Results */}
      {!loading && results.length > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
          {results.map((comic: any) => (
            <ComicCard
              key={comic.id}
              title={comic.title}
              cover={comic.cover}
              href={`/library/${comic.id}`}
            />
          ))}
        </div>
      )}
      {/* No results */}
      {!loading && results.length === 0 && query && (
        <p className="text-center text-gray-400">
          No results found for "{query}"
        </p>
      )}
    </div>
  );
}
