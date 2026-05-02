"use client";

import { twMerge } from "tailwind-merge";
import Image, { ImageProps } from "next/image";

interface DocsImageProps extends ImageProps {
  containerClassName?: string;
  theme?: "light" | "dark";
}

export function DocsImage({
  containerClassName,
  theme,
  alt = "",
  ...props
}: DocsImageProps) {
  return (
    <span
      className={twMerge(
        "block w-fit overflow-hidden rounded-lg rounded-md border-1 border-gray-300 max-md:mb-6 md:mb-8 dark:border-gray-600",
        theme === "dark" && "not-dark:hidden",
        theme === "light" && "dark:hidden",
        containerClassName,
      )}
    >
      <Image alt={alt} quality={100} {...props} />
    </span>
  );
}
