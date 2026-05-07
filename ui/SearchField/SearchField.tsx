"use client";

import {
  Input,
  composeRenderProps,
  SearchField as RACSearchField,
} from "react-aria-components";

import type {
  ValidationResult,
  SearchFieldProps as RACSearchFieldProps,
} from "react-aria-components";

import { Search } from "lucide-react";
import { tv } from "tailwind-variants";
import { fieldInputStyles } from "../TextField";
import { FieldError, fieldStyles, Label } from "../Field";

type SearchFieldProps = RACSearchFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    label?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
    inputClassName?: string | ((values: any) => string);
  };

export const searchInputStyles = tv({
  extend: fieldInputStyles,
  base: "peer pr-[calc(var(--spacing)*5+18px)] [&::-webkit-search-cancel-button]:hidden",

  slots: {
    icon: [
      "pointer-events-none",
      "absolute top-1/2 right-5 -translate-y-1/2",
      "text-(--text-primary)",
      "peer-disabled:text-(--text-disabled)",
    ],
  },
});

export const SearchField = ({
  label,
  errorMessage,
  placeholder,
  className,
  inputClassName,
  ...props
}: SearchFieldProps) => {
  const { base, icon } = searchInputStyles();

  return (
    <RACSearchField
      {...props}
      className={composeRenderProps(className, (className) =>
        fieldStyles({ className }),
      )}
    >
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Input
          placeholder={placeholder}
          className={composeRenderProps(
            inputClassName,
            (className, renderProps) => base({ ...renderProps, className }),
          )}
        />
        <Search
          size={18}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className={icon()}
        />
      </div>
      <FieldError>{errorMessage}</FieldError>
    </RACSearchField>
  );
};
