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
      true: "border-blue-500 dark:border-blue-700",
    },
    isInvalid: {
      true: "border-red-300 dark:border-red-800",
    },
    isDisabled: {
      false: [
        "text-black dark:text-white",
        "placeholder:text-gray-500 dark:placeholder:text-gray-400",
      ].join(" "),

      true: [
        "border-gray-100 dark:border-gray-800",
        "bg-gray-100 dark:bg-gray-800",
        "text-gray-400 dark:text-gray-500",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      ].join(" "),
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isFocused: false,
      isInvalid: false,
      className: "border-gray-300 dark:border-gray-600",
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
