/** Shape returned by GET /api/comics/search for each result. */
export type ComicSearchResult = {
  id: number;
  title: string;
  cover: string;
  publisher: string;
  start_year: string;
  authors: string[];
};

export type ComicSearchResponse = {
  results: ComicSearchResult[];
  nextPage: number | null;
};

/** Subset of the raw Comic Vine volume object returned by GET /api/comics/[comicId]. */
export type ComicDetail = {
  id: number;
  name?: string;
  publisher?: { name?: string } | null;
  start_year?: string | null;
  image?: { original_url?: string } | null;
};
