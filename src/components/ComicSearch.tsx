"use client";

import { useState } from "react";
import { useComicSearch } from "@/hooks/useComics";
import ComicCard from "./ComicCard";
import ComicDetailDrawer from "./ComicDetailDrawer";
import { SearchInput } from "./SearchInput";
import { ComicGridSkeleton } from "./ComicGridSkeleton";

export default function ComicSearch() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [selectedComic, setSelectedComic] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useComicSearch(search);

  const comics = data?.pages?.flatMap((page) => page.results ?? []) ?? [];

  return (
    <div className="p-4">
      {/* Search Input + Button */}
      <div className="mb-4">
        <SearchInput
          value={input}
          onChange={setInput}
          onSearch={() => setSearch(input)}
        />
      </div>

      {isLoading && <ComicGridSkeleton />}

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {comics.map((comic, index) => (
          <ComicCard
            key={`${comic.id}-${index}`}
            title={comic.title}
            cover={comic.cover}
            // href={`/comics/${comic.id}`}
            onClick={() => {
              setSelectedComic(comic.id);
              setDrawerOpen(true);
            }}
          />
        ))}
      </div>

      {/* Drawer */}
      {selectedComic !== null && (
        <ComicDetailDrawer
          comicId={selectedComic}
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
        />
      )}

      {/* Load More */}
      {hasNextPage && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="bg-gray-800 text-white px-4 py-2"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
