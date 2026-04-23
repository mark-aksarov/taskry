"use client";

import {
  composeRenderProps,
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

export const linkStyles = tv({
  extend: focusRing,
  base: "cursor-pointer",
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
