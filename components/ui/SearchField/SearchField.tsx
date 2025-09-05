import type {
  SearchFieldProps as RACSearchFieldProps,
  ValidationResult,
} from "react-aria-components";
import {
  composeRenderProps,
  Input,
  SearchField as RACSearchField,
} from "react-aria-components";
import { FieldError, fieldStyles, Label } from "../Field";
import { Search } from "lucide-react";
import clsx from "clsx";
import { fieldInputStyles } from "../TextField";
import { tv } from "tailwind-variants";

type SearchFieldProps = RACSearchFieldProps &
  React.RefAttributes<HTMLDivElement> & {
    label: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
    inputClassName?: string;
  };

const searchInputStyles = tv({
  extend: fieldInputStyles,
  base: "peer pr-[calc(var(--spacing)*5+18px)] [&::-webkit-search-cancel-button]:hidden",
});

export const SearchField = ({
  label,
  errorMessage,
  placeholder,
  className,
  inputClassName,
  ...props
}: SearchFieldProps) => {
  return (
    <RACSearchField {...props} className={clsx(fieldStyles(), className)}>
      <Label>{label}</Label>
      <div className="relative">
        <Input
          placeholder={placeholder}
          className={composeRenderProps(
            inputClassName,
            (className, renderProps) =>
              clsx(className, searchInputStyles({ ...renderProps })),
          )}
        />
        <Search
          size={18}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 peer-disabled:text-gray-400 dark:peer-disabled:text-gray-500"
        />
      </div>
      <FieldError>{errorMessage}</FieldError>
    </RACSearchField>
  );
};
