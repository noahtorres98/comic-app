"use client";

import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useComic } from "@/hooks/useComic";

interface ComicProps {
  comicId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComicDetailDrawer({
  comicId,
  open,
  onOpenChange,
}: ComicProps) {
  const { data: comic, isLoading, isError } = useComic(comicId);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="bg-[#1A1A1A] text-white">
        <DrawerHeader>
          <DrawerTitle>
            {isError ? "Couldn't load comic" : comic?.name || "Loading..."}
          </DrawerTitle>
          <DrawerDescription>{comic?.publisher?.name || ""}</DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          {isLoading ? (
            <Card className="w-full max-w-xs">
              <CardHeader>
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video w-full" />
              </CardContent>
            </Card>
          ) : isError ? (
            <p role="alert" className="text-sm text-red-400">
              Something went wrong while loading this comic. Please try again.
            </p>
          ) : (
            <div className="space-y-2">
              {comic?.image?.original_url && (
                <Image
                  src={comic.image.original_url}
                  alt={comic.name ? `Cover of ${comic.name}` : "Comic cover"}
                  width={400}
                  height={600}
                  sizes="400px"
                  className="rounded mb-4 h-auto w-full"
                />
              )}
              {comic?.start_year && <p>Start Year: {comic.start_year}</p>}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
