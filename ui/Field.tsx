"use client";

import {
  FieldErrorProps,
  FieldError as ReactAriaFieldError,
  LabelProps,
  Label as ReactAriaLabel,
} from "react-aria-components";
import { tv } from "tailwind-variants";

/**
 * Shared form field building home.
 * These styles and components are used to reuse across multiple form-related components.
 */

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <ReactAriaLabel {...props} className={fieldLabelStyles()}>
      {children}
    </ReactAriaLabel>
  );
};

export const FieldError = ({ children, ...props }: FieldErrorProps) => {
  return (
    <ReactAriaFieldError {...props} className={fieldErrorStyles()}>
      {children}
    </ReactAriaFieldError>
  );
};

export const fieldStyles = tv({
  base: "group flex flex-col gap-3",
});

export const fieldLabelStyles = tv({
  base: "text-xs font-bold text-(--text-primary)",
});

export const fieldErrorStyles = tv({
  extend: fieldLabelStyles,
  base: "text-red-600 dark:text-red-500",
});

export const fieldGroupStyles = tv({
  base: "group flex w-full rounded-xl border p-4 text-sm font-normal outline-hidden",
});
