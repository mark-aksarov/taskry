"use client";

import {
  SearchField as BaseSearchField,
  searchInputStyles as baseSearchInputStyles,
} from "@/components/ui/SearchField";

import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
import { useSearchBar } from "./SearchBar";

const searchInputStyles = tv({
  extend: baseSearchInputStyles,
  base: "rounded-full bg-white py-3 dark:bg-gray-800",
});

export const SearchField = () => {
  const t = useTranslations("search.SearchField");

  const { value, updateValue } = useSearchBar();

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    updateValue(value);
  }, 500);

  return (
    <BaseSearchField
      aria-label={t("ariaLabel")}
      placeholder={t("placeholder")}
      name="search"
      defaultValue={value}
      onChange={debouncedSetQuery}
      className="flex-auto"
      inputClassName={searchInputStyles}
      maxLength={255}
    />
  );
};
