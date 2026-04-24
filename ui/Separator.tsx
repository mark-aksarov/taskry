"use client";

import {
  SeparatorProps,
  Separator as RACSeparator,
} from "react-aria-components";

import React from "react";
import { twMerge } from "tailwind-merge";

export function Separator({ className, ...props }: SeparatorProps) {
  return (
    <RACSeparator
      {...props}
      className={twMerge(
        "h-px w-full border-none bg-gray-300 dark:bg-gray-600",
        className,
      )}
    />
  );
}
