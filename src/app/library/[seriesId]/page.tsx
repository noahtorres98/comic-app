import comics from "@/data/comics.json";
import ComicCard from "@/components/ComicCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function SeriesPage({
  params,
}: {
  params: { seriesId: string };
}) {
  const series = comics.find((s) => s.id === params.seriesId);
  if (!series) return <div>Series not found</div>;

  return (
    <main className="min-h-screen p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/library">Series</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/library/${series.id}`}>
              {series.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-6">{series.title}</h1>

      {/* Use same grid as homepage */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {series.issues.map((issue) => (
          <ComicCard
            key={issue.id}
            title={`Issue #${issue.id}`}
            cover={issue.cover}
            href="#" // optional: can open modal or page later
          />
        ))}
      </div>
    </main>
  );
}
