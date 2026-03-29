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
  const cardContent = (
    <div
      className="flex flex-col shadow-md overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden hover:shadow-lg transition">
        <img src={cover} alt={title} className="w-full h-64 object-cover" />

        <CardContent className="p-3">
          <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
        </CardContent>
      </Card>
    </div>
  );

  // Only wrap in Link if href is provided and onClick is NOT provided
  if (href && !onClick) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
