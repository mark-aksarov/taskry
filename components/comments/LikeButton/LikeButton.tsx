import { tv } from "tailwind-variants";
import { focusRing, RACButton } from "@/components/ui";
import React from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  value?: number;
  fill?: boolean;
  isDisabled?: boolean;
}

const styles = tv({
  extend: focusRing,
  base: "flex cursor-pointer items-center gap-1.5 text-xs font-bold",
  variants: {
    fill: {
      false:
        "pressed:text-gray-600 dark:pressed:text-gray-300 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-200",
      true: "pressed:text-red-400 dark:pressed:text-red-600 text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-500",
    },
    isDisabled: {
      true: "pointer-events-none cursor-default text-gray-400 dark:text-gray-500",
    },
  },
});

export function LikeButton({ value, fill, isDisabled }: LikeButtonProps) {
  return (
    <RACButton
      className={(renderProps) => styles({ ...renderProps, fill })}
      aria-label="Like comment"
      isDisabled={isDisabled}
    >
      <Heart
        size={16}
        strokeWidth={1.5}
        absoluteStrokeWidth
        fill={fill ? "currentColor" : "none"}
      />
      {value}
    </RACButton>
  );
}
