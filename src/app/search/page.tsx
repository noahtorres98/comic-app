import ComicSearch from "@/components/ComicSearch";
import { BreadCrumb } from "@/components/BreadCrumb";

export default function Search() {
  return (
    <div className="max-h-screen p-8 bg-[var(--color-bg)] text-[var(--color-foreground)]">
      <BreadCrumb />
      <h1 className="text-3xl font-bold mb-6">Search Comics</h1>
      <ComicSearch />
    </div>
  );
}
