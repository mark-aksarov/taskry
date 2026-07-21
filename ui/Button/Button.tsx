"use client";

import {
  composeRenderProps,
  Button as ReactAriaButton,
  ButtonProps as ReactAriaButtonProps,
} from "react-aria-components";
import { Loader2 } from "lucide-react";
import { ButtonOwnProps } from "./types";
import { buttonStyles, iconButtonStyles } from "./styles";

export type ButtonProps = ButtonOwnProps &
  ReactAriaButtonProps &
  React.RefAttributes<HTMLButtonElement>;

export const Button = ({
  variant,
  size = "small",
  outlined,
  iconLeft,
  iconRight,
  label,
  className,
  ...props
}: ButtonProps) => {
  const styles = label ? buttonStyles : iconButtonStyles;

  return (
    <ReactAriaButton
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
      {props.isPending && (
        <Loader2
          data-testid="loader-icon"
          size={size === "small" ? 16 : size === "medium" ? 18 : 20}
          strokeWidth={size === "small" ? 1.5 : size === "medium" ? 1.75 : 2}
          
          className="animate-spin"
        />
      )}
      {iconLeft}
      {label && <span>{label}</span>}
      {iconRight}
    </ReactAriaButton>
  );
};
