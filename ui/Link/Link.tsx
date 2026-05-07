"use client";

import {
  composeRenderProps,
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";

type LinkVariant = "primary";

export const styles = tv({
  extend: focusRing,
  base: "flex w-fit items-center gap-2 text-sm font-normal text-(--text-primary)",
  variants: {
    variant: {
      primary:
        "text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-500",
    },
    isDisabled: {
      false: "cursor-pointer",
    },
  },
});

type LinkProps = ReactAriaLinkProps & {
  variant?: LinkVariant;
};

export function Link({ variant, className, ...props }: LinkProps) {
  return (
    <ReactAriaLink
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant, className }),
      )}
      {...props}
    />
  );
}
