"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  comicId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComicDetailDrawer({
  comicId,
  open,
  onOpenChange,
}: Props) {
  const [comic, setComic] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!comicId) return;
    const fetchComic = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/comics/${comicId}`);
        const data = await res.json();
        setComic(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComic();
  }, [comicId]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="bg-[#1A1A1A] text-white max-w-md overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>{comic?.name || "Loading..."}</DrawerTitle>
          <DrawerDescription>{comic?.publisher?.name || ""}</DrawerDescription>
        </DrawerHeader>

        <div className="p-4">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="space-y-2">
              {comic.image?.original_url && (
                <img
                  src={comic.image.original_url}
                  alt={comic.name}
                  className="rounded mb-4"
                />
              )}
              <p>Start Year: {comic.start_year}</p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
