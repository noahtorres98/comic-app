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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useComic } from "@/hooks/useComic";

interface ComicProps {
  comicId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Comic = {
  id: string;
  name?: string;
  publisher?: { name?: string };
  start_year?: number;
  image?: { original_url?: string };
};

export default function ComicDetailDrawer({
  comicId,
  open,
  onOpenChange,
}: ComicProps) {
  const { data: comic = {} as Comic, isLoading, error } = useComic(comicId);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="bg-[#1A1A1A] text-white">
        <DrawerHeader>
          <DrawerTitle>{comic?.name || "Loading..."}</DrawerTitle>
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
