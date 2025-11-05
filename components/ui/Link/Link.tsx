"use client";

import { default as NextLink } from "next/link";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

type LinkVariants = "primary";

export type LinkProps = {
  variant?: LinkVariants;
} & React.ComponentProps<typeof NextLink>;

export const linkStyles = tv({
  extend: focusRing,
  base: "not:focus-visible:outline-0 inline-flex cursor-pointer items-center gap-1 focus-visible:outline-2",

  variants: {
    variant: {
      primary:
        "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-500",
    },
  },
});

export const Link = ({
  href,
  children,
  className,
  variant,
  ...props
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      className={linkStyles({ className, variant })}
      {...props}
    >
      {children}
    </NextLink>
  );
};
