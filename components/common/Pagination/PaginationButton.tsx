"use client";

import { twMerge } from "tailwind-merge";
import { PaginationSize } from "./Pagination";
import { Button, ButtonProps } from "@/components/ui";

export type PaginationButtonProps = {
  size?: PaginationSize;
} & Omit<ButtonProps<"button">, "size">;

export function PaginationButton({ size, ...props }: PaginationButtonProps) {
  return (
    <Button
      className={twMerge(
        "justify-center rounded-full",
        size === "small" && "h-7.5 w-7.5",
        size === "large" && "h-9 w-9",
      )}
      size="small"
      {...props}
    />
  );
}
