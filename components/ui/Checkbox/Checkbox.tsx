"use client";

import {
  CheckboxProps as RACCheckboxProps,
  composeRenderProps,
  Checkbox as RACCheckbox,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "../styles";
import { Check } from "lucide-react";

type CheckboxProps = Omit<RACCheckboxProps, "children"> &
  React.RefAttributes<HTMLLabelElement> & {
    errorMessage?: string;
    children?: React.ReactNode;
  };

const checkboxStyles = tv({
  base: "group flex items-center gap-2 text-sm font-bold",
  variants: {
    isDisabled: {
      false: "text-black dark:text-white",
      true: "text-gray-400 dark:text-gray-500",
    },
  },
});

const boxStyles = tv({
  extend: focusRing,
  base: "flex h-5 w-5 items-center justify-center rounded-sm",
  variants: {
    isSelected: {
      false: "bg-gray-100 dark:bg-gray-700",
      true: "",
    },
    isDisabled: {
      true: "",
    },
  },
  compoundVariants: [
    {
      isSelected: true,
      isDisabled: false,
      isInvalid: false,
      className: "bg-blue-600 dark:bg-blue-700",
    },
  ],
});

const iconStyles =
  "text-white group-disabled:text-gray-400 dark:group-disabled:text-gray-500";

export const Checkbox = ({ children, ...props }: CheckboxProps) => {
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
            className={boxStyles({
              isSelected,
              ...renderProps,
            })}
          >
            {isSelected ? (
              <Check
                size={14}
                strokeWidth={2}
                absoluteStrokeWidth
                className={iconStyles}
              />
            ) : null}
          </div>
          {children}
        </>
      )}
    </RACCheckbox>
  );
};
