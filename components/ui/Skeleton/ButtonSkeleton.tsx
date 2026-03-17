"use client";

import { Skeleton } from "./Skeleton";
import { ButtonSize } from "../Button";
import { tv } from "tailwind-variants";

interface ButtonSkeletonProps {
  size?: ButtonSize;
  ghost?: boolean;
  className?: string;
}

const styles = tv({
  base: "flex items-center justify-center gap-x-1.5 rounded-lg",
  variants: {
    size: {
      small: "px-3 py-2 text-xs",
      medium: "px-5 py-3 text-sm",
      large: "px-6 py-4 text-base",
    },
  },
});

export function ButtonSkeleton({
  ghost,
  size = "small",
  className,
}: ButtonSkeletonProps) {
  if (ghost) {
    return (
      <div
        className={styles({
          size,
          className,
        })}
      >
        <Skeleton
          size={size === "small" ? "xs" : size === "medium" ? "sm" : "base"}
          className="rounded-md"
        />
      </div>
    );
  }

  return (
    <Skeleton
      className={styles({
        size,
        className,
      })}
    />
  );
}
