"use client";

import { Skeleton, fieldGroupStyles, fieldStyles } from "@/components/ui";
import { twMerge } from "tailwind-merge";

export function FieldSkeleton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={fieldStyles({ className })}>
      <Skeleton size="xs" className="w-[4rem]" />
      {children}
    </div>
  );
}

export function FieldGroupSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton
      className={fieldGroupStyles({
        className: twMerge("border-transparent text-sm", className),
      })}
    />
  );
}
