"use client";

import { twMerge } from "tailwind-merge";
import { Heading, HeadingProps } from "react-aria-components";

export const DialogHeading = ({
  className,
  children,
  ...props
}: HeadingProps) => {
  return (
    <Heading
      slot="title"
      className={twMerge(
        "font-bold text-nowrap text-black max-md:text-base md:text-lg dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </Heading>
  );
};
