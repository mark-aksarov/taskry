"use client";

import {
  LinkProps as ReactAriaLinkProps,
  Link as ReactAriaLink,
} from "react-aria-components";

import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

type LinkVariants = "primary";

export type LinkProps = {
  variant?: LinkVariants;
  className?: string;
} & ReactAriaLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

export const linkStyles = tv({
  extend: focusRing,
  base: "not:focus-visible:outline-0 flex cursor-pointer items-center gap-1 focus-visible:outline-2",

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
    <ReactAriaLink
      href={href}
      className={linkStyles({ className, variant })}
      {...props}
    >
      {children}
    </ReactAriaLink>
  );
};
