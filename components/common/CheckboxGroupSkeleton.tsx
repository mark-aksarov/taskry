"use client";

import { fieldStyles, Skeleton } from "@/components/ui";

export function CheckboxGroupSkeleton() {
  return (
    <div className={fieldStyles()}>
      <Skeleton size="xs" className="w-[4rem]" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
      <Skeleton size="sm" />
    </div>
  );
}
