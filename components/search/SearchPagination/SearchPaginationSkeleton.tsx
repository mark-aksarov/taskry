"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export function SearchPaginationSkeleton() {
  return (
    <div className="flex h-[1.875rem] w-full items-center">
      <Skeleton size="sm" className="w-[10rem]" />
    </div>
  );
}
