"use client";

import {
  composeRenderProps,
  ToggleButtonGroup as RACToggleButtonGroup,
  ToggleButtonGroupProps as RACToggleButtonGroupProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { ToggleButtonVariantContext } from "./ToggleButtonVariantContext";

export type ToggleButtonVariant = "primary" | "contrast";

export interface ToggleButtonGroupProps extends RACToggleButtonGroupProps {
  variant?: ToggleButtonVariant;
}

const styles = tv({
  base: "inline-flex gap-4 rounded-lg",
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
});

export const ToggleButtonGroup = ({
  variant = "primary",
  ...props
}: ToggleButtonGroupProps) => {
  return (
    <ToggleButtonVariantContext.Provider value={variant}>
      <RACToggleButtonGroup
        {...props}
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            styles({ ...renderProps, direction: props.orientation, className }),
        )}
      />
    </ToggleButtonVariantContext.Provider>
  );
};
