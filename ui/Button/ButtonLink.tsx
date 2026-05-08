"use client";

import {
  composeRenderProps,
  Link as ReactAriaLink,
  LinkProps as ReactAriaLinkProps,
} from "react-aria-components";

import { ButtonOwnProps } from "./types";
import { buttonStyles, iconButtonStyles } from "./styles";

export type ButtonLinkProps = ButtonOwnProps &
  ReactAriaLinkProps &
  React.RefAttributes<HTMLAnchorElement>;

export const ButtonLink = ({
  variant,
  size = "small",
  outlined,
  iconLeft,
  iconRight,
  label,
  className,
  ...props
}: ButtonLinkProps) => {
  const styles = label ? buttonStyles : iconButtonStyles;

  return (
    <ReactAriaLink
      className={composeRenderProps(className, (className, renderProps) =>
        styles({
          ...renderProps,
          variant,
          size,
          outlined,
          className,
        }),
      )}
      {...props}
    >
      {iconLeft}
      {label && <span>{label}</span>}
      {iconRight}
    </ReactAriaLink>
  );
};
