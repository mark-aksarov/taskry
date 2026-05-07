"use client";

import { useSearchBar } from "./SearchBar";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";
import { SearchField as BaseSearchField } from "@/ui/SearchField";

export const SearchField = () => {
  const t = useTranslations("dashboard.search.SearchField");

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
      inputClassName="rounded-full py-3 bg-(--surface-1)"
      maxLength={255}
    />
  );
};
