"use client";

import { tv } from "tailwind-variants";
import type {
  TextFieldProps as RACTextFieldProps,
  ValidationResult,
} from "react-aria-components";
import {
  Input,
  TextField as RACTextField,
  TextArea,
  composeRenderProps,
} from "react-aria-components";
import { fieldGroupStyles, fieldStyles, Label } from "../Field";
import { FieldError } from "../Field";

type TextFieldProps = RACTextFieldProps &
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
      true: "border-blue-500 dark:border-blue-800",
    },
    isInvalid: {
      true: "border-red-300 dark:border-red-800",
    },
    isDisabled: {
      false: "placeholder:text-gray-500 dark:placeholder:text-gray-400",
      true: "border-gray-100 bg-gray-100 text-gray-400 placeholder:text-gray-400 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-500 dark:placeholder:text-gray-500",
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
