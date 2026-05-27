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
        "text-(--text-link) hover:text-(--text-link-hover) disabled:text-(--text-disabled)",
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
