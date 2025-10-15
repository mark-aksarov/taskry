import { tv } from "tailwind-variants";
import { focusRing, RACButton } from "@/components/ui";
import React from "react";

type CommentButtonColor = "default" | "red";

interface CommentButtonProps {
  icon: React.ReactElement;
  label?: React.ReactNode;
  color?: CommentButtonColor;
  fill?: boolean;
  "aria-label"?: string;
  isDisabled?: boolean;
}

const styles = tv({
  extend: focusRing,
  base: "flex cursor-pointer items-center gap-1.5 text-xs font-bold",
  variants: {
    color: {
      default:
        "pressed:text-gray-600 dark:pressed:text-gray-300 text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-200",
      red: "pressed:text-red-400 dark:pressed:text-red-600 text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-500",
    },
    isDisabled: {
      true: "pointer-events-none cursor-default text-gray-400 dark:text-gray-500",
    },
  },
});

export function CommentButton({
  icon,
  label,
  color = "default",
  fill,
  "aria-label": ariaLabel,
  isDisabled,
}: CommentButtonProps) {
  return (
    <RACButton
      className={(renderProps) => styles({ ...renderProps, color })}
      aria-label={ariaLabel}
      isDisabled={isDisabled}
    >
      {fill
        ? React.cloneElement<any>(icon, {
            fill: "currentColor",
          })
        : icon}
      {label}
    </RACButton>
  );
}
