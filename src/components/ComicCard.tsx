import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

interface ComicCardProps {
  title: string;
  cover: string;
  href?: string;
  onClick?: () => void;
}

export default function ComicCard({
  title,
  cover,
  href,
  onClick,
}: ComicCardProps) {
  const card = (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <div className="relative w-full h-64 bg-zinc-900">
        {cover && (
          <Image
            src={cover}
            alt={title ? `Cover of ${title}` : "Comic cover"}
            fill
            sizes="(min-width: 768px) 20vw, 50vw"
            className="object-cover"
          />
        )}
      </div>

      <CardContent className="p-3">
        <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
      </CardContent>
    </Card>
  );

  const wrapperClass =
    "flex flex-col w-full text-left shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer";

  // Use a real button for click handlers so the card is keyboard accessible.
  if (onClick) {
    return (
      <button type="button" className={wrapperClass} onClick={onClick}>
        {card}
      </button>
    );
  }

  const cardContent = <div className={wrapperClass}>{card}</div>;

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
