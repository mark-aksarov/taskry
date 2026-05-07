"use client";

import {
  composeRenderProps,
  Checkbox as RACCheckbox,
  CheckboxProps as RACCheckboxProps,
} from "react-aria-components";

import { Check } from "lucide-react";
import { focusRing } from "../styles";
import { tv } from "tailwind-variants";

export type CheckboxProps = Omit<RACCheckboxProps, "children"> &
  React.RefAttributes<HTMLLabelElement> & {
    errorMessage?: string;
    children?: React.ReactNode;
  };

const checkboxStyles = tv({
  base: "group flex items-center gap-2 text-sm font-bold",
  variants: {
    isDisabled: {
      false: "text-(--text-primary)",
      true: "text-(--text-disabled)",
    },
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: "flex h-5 w-5 shrink-0 items-center justify-center self-start rounded-sm",
  variants: {
    isSelected: {
      false: "bg-(--surface-3)",
      true: "",
    },
    isDisabled: {
      true: "bg-(--bg-input-disabled)",
    },
  },
  compoundVariants: [
    {
      isSelected: true,
      isDisabled: false,
      isInvalid: false,
      className: "bg-(--accent)",
    },
  ],
  slots: {
    icon: "text-white group-disabled:text-(--text-disabled)",
  },
});

export const Checkbox = ({ children, ...props }: CheckboxProps) => {
  const { base: boxBase, icon: boxIcon } = boxStyles();

  return (
    <RACCheckbox
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        checkboxStyles({ ...renderProps, className }),
      )}
    >
      {({ isSelected, ...renderProps }) => (
        <>
          <div
            className={boxBase({
              isSelected,
              ...renderProps,
            })}
          >
            {isSelected ? (
              <Check
                size={14}
                strokeWidth={2}
                absoluteStrokeWidth
                className={boxIcon()}
              />
            ) : null}
          </div>
          {children}
        </>
      )}
    </RACCheckbox>
  );
};
