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
        "mb-6 w-fit overflow-hidden rounded-lg border-1 border-(--border-primary)",
        containerClassName,
      )}
    >
      <Image alt={alt} quality={100} {...props} />
    </div>
  );
}
