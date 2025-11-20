import { Skeleton } from "@/components/ui";

export function DetailCardHeadingSkeleton() {
  return (
    <>
      <Skeleton className="w-[10rem] max-lg:hidden" size="lg" />
      <Skeleton className="w-[10rem] lg:hidden" size="base" />
    </>
  );
}
