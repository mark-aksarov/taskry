"use client";

import {
  RACForm,
  SearchField,
  searchInputStyles as baseSearchInputStyles,
} from "@/components/ui";
import { tv } from "tailwind-variants";

const searchInputStyles = tv({
  extend: baseSearchInputStyles,
  base: "rounded-full bg-white py-3 dark:bg-gray-800",
  compoundVariants: [
    {
      isDisabled: false,
      isFocused: false,
      isInvalid: false,
      className: "border-white dark:border-gray-900",
    },
  ],
});

export const SearchForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Implement event handler
  };

  return (
    <RACForm onSubmit={handleSubmit} className="w-full max-w-[360px] shrink-1">
      <SearchField
        aria-label="Search"
        placeholder="Search"
        name="search"
        inputClassName={searchInputStyles}
      />
    </RACForm>
  );
};
