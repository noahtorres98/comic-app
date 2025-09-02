import ComicCard from "@/components/ComicCard";
import comicsData from "@/data/comics.json";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ComicSearch from "@/components/ComicSearch";

export default async function Library() {
  const res = await fetch("http://localhost:3000/api/comics", {
    cache: "no-store", // ensures fresh data
  });
  const comics = await res.json();
  return (
    <main className="max-h-screen p-8 bg-[var(--color-bg)] text-[var(--color-foreground)]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search">Search</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-6">Search Comics</h1>
      <ComicSearch />
    </main>
  );
}
