"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Image, { ImageProps } from "next/image";

export function DocsImage(props: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <span
      className={twMerge(
        "block w-fit overflow-hidden rounded-lg rounded-md max-md:mb-6 md:mb-8",
        !isLoading && "border-1 border-gray-200 shadow-lg dark:border-gray-800",
      )}
    >
      <Image
        width={1240}
        height={825}
        className="w-[800px] max-w-full"
        onLoadingComplete={() => setIsLoading(false)}
        {...(props as ImageProps)}
      />
    </span>
  );
}
