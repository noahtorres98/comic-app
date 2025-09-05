import Link from "next/link";

interface ComicCardProps {
  title: string;
  cover: string;
  href?: string;
  onClick?: () => void; // <-- add this
}

export default function ComicCard({
  title,
  cover,
  href,
  onClick,
}: ComicCardProps) {
  const cardContent = (
    <div
      className="flex flex-col bg-[var(--color-bg)] shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
      onClick={onClick} // <-- attach the click handler
    >
      <div className="w-full aspect-[2/3] relative">
        <img src={cover} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-2 text-[var(--color-foreground)] text-sm">
        <h2 className="font-semibold">{title}</h2>
      </div>
    </div>
  );

  // Only wrap in Link if href is provided and onClick is NOT provided
  if (href && !onClick) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
