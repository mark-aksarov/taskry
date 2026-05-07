"use client";

import {
  Input,
  TextArea,
  composeRenderProps,
  TextField as RACTextField,
} from "react-aria-components";

import type {
  ValidationResult,
  TextFieldProps as RACTextFieldProps,
} from "react-aria-components";

import { FieldError } from "../Field";
import { tv } from "tailwind-variants";
import { fieldGroupStyles, fieldStyles, Label } from "../Field";

export type TextFieldProps = RACTextFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    label: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
    multiline?: boolean;
    inputClassName?: string;
  };

export const fieldInputStyles = tv({
  extend: fieldGroupStyles,
  variants: {
    multiline: {
      true: "resize-none",
    },
    isFocused: {
      true: "border-(--border-info)",
    },
    isInvalid: {
      true: "border-(--border-danger)",
    },
    isDisabled: {
      false: [
        "text-(--text-primary)",
        "placeholder:text-(--text-secondary)",
      ].join(" "),

      true: [
        "border-(--border-disabled)",
        "bg-(--bg-input-disabled)",
        "text-(--text-disabled)",
        "placeholder:text-(--text-disabled)",
      ].join(" "),
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isFocused: false,
      isInvalid: false,
      className: "border-(--border-primary)",
    },
  ],
});

export const TextField = ({
  label,
  errorMessage,
  placeholder,
  multiline,
  className,
  inputClassName,
  ...props
}: TextFieldProps) => {
  const inputClasses = composeRenderProps<string | undefined, any, string>(
    inputClassName,
    (className, renderProps) =>
      fieldInputStyles({ ...renderProps, className, multiline }),
  );

  return (
    <RACTextField
      {...props}
      className={composeRenderProps(className, (className) =>
        fieldStyles({ className }),
      )}
    >
      <Label>{label}</Label>
      {multiline ? (
        <TextArea placeholder={placeholder} className={inputClasses} />
      ) : (
        <Input placeholder={placeholder} className={inputClasses} />
      )}
      <FieldError>{errorMessage}</FieldError>
    </RACTextField>
  );
};
