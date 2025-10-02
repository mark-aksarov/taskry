"use client";

import { default as NextLink } from "next/link";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

export const linkStyles = tv({
  extend: focusRing,
  base: "not:focus-visible:outline-0 cursor-pointer text-sm font-bold text-blue-600 hover:text-blue-500 focus-visible:outline-2 active:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 dark:active:text-blue-600",
});

export const Link = ({
  href,
  children,
  className,
  ...props
}: React.ComponentProps<typeof NextLink>) => {
  return (
    <NextLink href={href} className={linkStyles({ className })} {...props}>
      {children}
    </NextLink>
  );
};
