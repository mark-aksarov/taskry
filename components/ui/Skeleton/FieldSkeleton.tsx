"use client";

import { twMerge } from "tailwind-merge";
import { Skeleton } from "@/components/ui/Skeleton";
import { fieldGroupStyles, fieldStyles } from "@/components/ui/Field";

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
