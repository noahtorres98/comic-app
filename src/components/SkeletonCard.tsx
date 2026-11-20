import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs bg-zinc-950">
      <CardHeader>
        <Skeleton className="h-4 w-2/3 bg-zinc-900" />
        <Skeleton className="h-4 w-1/2 bg-zinc-900" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full bg-zinc-900" />
      </CardContent>
    </Card>
  );
}
