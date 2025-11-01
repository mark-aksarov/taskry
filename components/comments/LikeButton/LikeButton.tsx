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
  base: "pressed:text-red-400 dark:pressed:text-red-600 flex cursor-pointer items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-500",
  variants: {
    isDisabled: {
      true: "pointer-events-none cursor-default text-gray-400 dark:text-gray-500",
    },
  },
});

export function LikeButton({ value, fill, isDisabled }: LikeButtonProps) {
  return (
    <RACButton
      className={(renderProps) => styles({ ...renderProps })}
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
