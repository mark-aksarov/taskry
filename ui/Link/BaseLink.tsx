"use client";

import {
  composeRenderProps,
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

const linkStyles = tv({
  extend: focusRing,

  variants: {
    isDisabled: {
      false: "cursor-pointer",
    },
  },
});

export const BaseLink = ({ className, ...props }: ReactAriaLinkProps) => {
  return (
    <ReactAriaLink
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
};
