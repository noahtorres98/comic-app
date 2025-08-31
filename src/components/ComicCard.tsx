import Link from "next/link";

interface ComicCardProps {
  title: string;
  cover: string;
  href?: string;
}

export default function ComicCard({ title, cover, href }: ComicCardProps) {
  const cardContent = (
    <div className="flex flex-col bg-[var(--color-bg)] shadow-md rounded-md overflow-hidden hover:scale-105 transition-transform duration-200">
      <div className="w-full aspect-[2/3] relative">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-2 text-[var(--color-foreground)] text-sm">
        <h2 className="font-semibold">{title}</h2>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }
  return cardContent;
}
