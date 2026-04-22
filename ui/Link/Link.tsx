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
  base: "flex cursor-pointer items-center gap-1",
});

export const Link = ({ className, ...props }: ReactAriaLinkProps) => {
  return (
    <ReactAriaLink
      className={composeRenderProps(className, (className, renderProps) =>
        linkStyles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
};
