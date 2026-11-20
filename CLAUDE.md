# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build with Turbopack (also runs type checking)
npm run lint    # eslint . (flat config in eslint.config.mjs)
npx tsc --noEmit
```

There is no test suite. If `npm` isn't on PATH, it lives under `~/.nvm/versions/node/v24.14.1/bin`.

## Environment

`.env.local` must define `COMIC_VINE_KEY` (a Comic Vine API key). Both API routes return a 500 `"Missing API key"` error without it.

## Architecture

Next.js 16 App Router app (React 19, TypeScript, Tailwind v4, shadcn/ui "new-york" style). The path alias `@/*` maps to `src/*`.

**Data flow for search/detail.** The browser never calls Comic Vine directly, because that would expose the API key. Client hooks call local route handlers, and the route handlers proxy to `https://comicvine.gamespot.com/api/`:
- `src/hooks/useComics.ts` → `useComicSearch(search)` is a TanStack `useInfiniteQuery` that calls `GET /api/comics/search?query=&page=`. `src/app/api/comics/search/route.ts` searches `resources=volume` 20 at a time. It maps the results to `{ id, title, cover, publisher, start_year, authors }` and returns `{ results, nextPage }`, where `nextPage` is `null` on the last page.
- `src/hooks/useComic.ts` → `useComic(id)` calls `GET /api/comics/[comicId]`, which fetches `volume/4050-{id}` and returns the raw Comic Vine `results` object. Note that this object is **not** remapped like the search results: it uses `name`, `image.original_url`, and so on.
- The `QueryClient` is created in `src/app/providers.tsx` (a client component) and wraps the app in `src/app/layout.tsx`.

**UI.** `ComicSearch` keeps the search results and opens `ComicDetailDrawer` (a vaul drawer on the right side) when you click a `ComicCard`. Pagination uses a "Load More" button that calls `fetchNextPage`.

**Local library data.** The home page (`src/app/page.tsx`) reads static series and issue data from `src/data/comics.json`. Cover images live in `public/comics/<series-id>/`. This local library is separate from the Comic Vine data. `/library` is currently a placeholder page.

**Styling.** Theme colors are CSS variables in `src/app/globals.css` (for example `--color-bg`, `--color-foreground`, `--color-accent`, `--nav-height`). Components reference them as `bg-[var(--color-bg)]`. The layout offsets `<main>` by `--nav-height` to make room for the fixed `Navbar`. shadcn primitives live in `src/components/ui/`; add new ones with the shadcn CLI (see `components.json`).

## Gotchas

- Comic Vine reports errors as HTTP 200 with a non-1 `status_code` in the body. The routes check that value, not just `res.ok`.
- Shared response types live in `src/types/comic.ts`.
- Images use plain `<img>` for now. Switching to `next/image` needs `images.remotePatterns` for `https://comicvine.gamespot.com/a/uploads/**` in `next.config.ts`.
- `next` and `eslint-config-next` are pinned to exact versions, so bump them together.
