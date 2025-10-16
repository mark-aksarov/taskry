"use client";

import { default as NextLink } from "next/link";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

export const linkStyles = tv({
  extend: focusRing,
  base: "not:focus-visible:outline-0 focus-visible:outline-2",
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
