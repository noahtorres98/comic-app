import ComicCard from "./ComicCard";

export default function SeriesGrid({ comics }: { comics: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
      {comics.map((series) => (
        <ComicCard
          key={series.id}
          title={series.title}
          image={series.cover}
          href={`/library/${series.id}`}
        />
      ))}
    </div>
  );
}
