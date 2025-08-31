import ComicCard from "./ComicCard";

export default function IssueGrid({ issues }: { issues: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
      {issues.map((issue) => (
        <ComicCard
          key={issue.id}
          title={`Issue #${issue.number}`}
          image={issue.cover}
        />
      ))}
    </div>
  );
}
