"use client";

import {
  composeRenderProps,
  Link as ReactAriaLink,
  type LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import { styles } from "./styles";
import { NavigationItemProps } from "./types";

type NavigationLinkProps = ReactAriaLinkProps & NavigationItemProps;

export function NavigationLink({
  isActive = false,
  variant = "primary",
  iconLeft,
  label,
  className,
  ...props
}: NavigationLinkProps) {
  return (
    <ReactAriaLink
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant, isActive, className }),
      )}
    >
      {iconLeft}
      {label}
    </ReactAriaLink>
  );
}
