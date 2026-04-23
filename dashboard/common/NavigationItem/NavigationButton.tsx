"use client";

import {
  composeRenderProps,
  Button as ReactAriaButton,
  ButtonProps as ReactAriaButtonProps,
} from "react-aria-components";

import { styles } from "./styles";
import { Loader2 } from "lucide-react";
import { NavigationItemProps } from "./types";

type NavigationButtonProps = ReactAriaButtonProps & NavigationItemProps;

export function NavigationButton({
  isPending,
  isActive = false,
  variant = "primary",
  iconLeft,
  label,
  className,
  ...props
}: NavigationButtonProps) {
  return (
    <ReactAriaButton
      {...props}
      isDisabled={isPending || props.isDisabled}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant, isActive, isPending, className }),
      )}
    >
      {isPending && (
        <Loader2
          data-testid="loader-icon"
          size={18}
          strokeWidth={1.75}
          className="animate-spin"
        />
      )}
      {iconLeft}
      {label}
    </ReactAriaButton>
  );
}
