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
    <div
      className={twMerge(
        "w-fit overflow-hidden rounded-lg border-1 border-gray-300 max-md:mb-6 md:mb-8 dark:border-gray-600",
        theme === "dark" && "not-dark:hidden",
        theme === "light" && "dark:hidden",
        containerClassName,
      )}
    >
      <Image alt={alt} quality={100} {...props} />
    </div>
  );
}
