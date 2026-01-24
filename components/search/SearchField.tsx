"use client";

import {
  SearchField as BaseSearchField,
  searchInputStyles as baseSearchInputStyles,
} from "@/components/ui";

import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";

const searchInputStyles = tv({
  extend: baseSearchInputStyles,
  base: "rounded-full bg-white py-3 dark:bg-gray-800",
});

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchField = ({ value, onChange }: SearchFieldProps) => {
  const t = useTranslations("search.SearchField");

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    onChange(value);
  }, 500);

  return (
    <BaseSearchField
      aria-label={t("ariaLabel")}
      placeholder={t("placeholder")}
      name="search"
      defaultValue={value}
      onChange={debouncedSetQuery}
      inputClassName={searchInputStyles}
    />
  );
};
