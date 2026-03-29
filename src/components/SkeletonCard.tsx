import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "./ui/spinner";

export function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Image placeholder */}
      <div className="w-full aspect-[2/3]">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Text placeholder */}
      <div className="p-2 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
