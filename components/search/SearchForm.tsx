"use client";

import {
  RACForm,
  SearchField,
  searchInputStyles as baseSearchInputStyles,
} from "@/components/ui";

import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";

const searchInputStyles = tv({
  extend: baseSearchInputStyles,
  base: "rounded-full bg-white py-3 dark:bg-gray-800",
});

export const SearchForm = () => {
  const t = useTranslations("layout.AppHeader.searchForm");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Implement event handler
  };

  return (
    <RACForm onSubmit={handleSubmit} className="w-full p-4 pb-0">
      <SearchField
        aria-label={t("ariaLabel")}
        placeholder={t("placeholder")}
        name="search"
        inputClassName={searchInputStyles}
      />
    </RACForm>
  );
};
