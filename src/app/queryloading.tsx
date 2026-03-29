import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ReactNode, Suspense } from "react";

type QueryLoadingBoundaryProps = {
  children: ReactNode;
};

export const QueryLoadingBoundary = ({
  children,
}: QueryLoadingBoundaryProps) => {
  return (
    <Suspense
      fallback={
        <Card>
          <Spinner className="size-3" />
        </Card>
      }
    >
      {children}
    </Suspense>
  );
};
