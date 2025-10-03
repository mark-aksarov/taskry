"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { fieldGroupStyles, fieldStyles } from "@/components/ui/Field";

export function FieldSkeleton() {
  return (
    <div className={fieldStyles()}>
      <Skeleton size="xs" className="w-[4rem]" />

      <Skeleton
        className={fieldGroupStyles({
          className: "border-transparent text-sm",
        })}
      />
    </div>
  );
}
