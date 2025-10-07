"use client";

import { Skeleton, fieldGroupStyles, fieldStyles } from "@/components/ui";

export function FieldSkeleton({ children }: { children?: React.ReactNode }) {
  return (
    <div className={fieldStyles()}>
      <Skeleton size="xs" className="w-[4rem]" />
      {children}
    </div>
  );
}

export function FieldGroupSkeleton() {
  return (
    <Skeleton
      className={fieldGroupStyles({
        className: "border-transparent text-sm",
      })}
    />
  );
}
