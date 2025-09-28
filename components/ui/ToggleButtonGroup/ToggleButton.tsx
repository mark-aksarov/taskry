"use client";

import { focusRing } from "../styles";
import { tv } from "tailwind-variants";
import { baseButtonStyles } from "../Button";
import type { ToggleButtonProps } from "react-aria-components";
import {
  composeRenderProps,
  ToggleButton as RACToggleButton,
} from "react-aria-components";
import { useContext } from "react";
import { ToggleButtonVariantContext } from "./ToggleButtonVariantContext";

export const toggleButtonStyles = tv({
  extend: focusRing,
  base: [baseButtonStyles.base, "px-3 py-2 text-xs text-black dark:text-white"],
  variants: {
    variant: {
      primary: "",
      contrast: "",
    },
    isSelected: {
      false:
        "pressed:bg-gray-200 dark:pressed:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600",
    },
    isDisabled: {
      true: "pointer-events-none bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isSelected: true,
      isDisabled: false,
      className: "bg-blue-600 text-white dark:bg-blue-700",
    },
    {
      variant: "contrast",
      isSelected: true,
      isDisabled: false,
      className: "bg-black text-white dark:bg-white dark:text-black",
    },
  ],
});

export const ToggleButton = (props: ToggleButtonProps) => {
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
