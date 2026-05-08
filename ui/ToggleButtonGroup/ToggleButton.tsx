"use client";

import {
  composeRenderProps,
  ToggleButton as RACToggleButton,
} from "react-aria-components";

import { useContext } from "react";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";
import { baseButtonStyles } from "../Button";
import { ToggleButtonVariantContext } from "./ToggleButtonVariantContext";
import type { ToggleButtonProps as RACToggleButtonProps } from "react-aria-components";

export const toggleButtonStyles = tv({
  extend: focusRing,
  base: [baseButtonStyles.base, "px-3 py-2 text-xs text-(--text-primary)"],
  variants: {
    variant: {
      primary: "",
      contrast: "",
    },
    isSelected: {
      false:
        "pressed:bg-(--surface-secondary-pressed) hover:bg-(--surface-secondary-hover)",
    },

    isDisabled: {
      true: "pointer-events-none bg-(--button-surface-disabled) text-(--text-disabled)",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isSelected: true,
      isDisabled: false,
      className: "bg-(--accent) text-white",
    },
    {
      variant: "contrast",
      isSelected: true,
      isDisabled: false,
      className: "bg-(--button-surface-contrast) text-(--button-text-contrast)",
    },
  ],
});

export const ToggleButton = (props: RACToggleButtonProps) => {
  const variant = useContext(ToggleButtonVariantContext);

  return (
    <RACToggleButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        toggleButtonStyles({
          ...renderProps,
          variant,
          className,
        }),
      )}
    />
  );
};
