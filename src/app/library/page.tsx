import { BreadCrumb } from "@/components/BreadCrumb";

export default async function Library() {
  return (
    <div className="max-h-screen p-8 bg-[var(--color-bg)] text-[var(--color-foreground)]">
      <BreadCrumb />
      <h1 className="text-3xl font-bold mb-6">My Library</h1>
    </div>
  );
}
