"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { pageSize } from "../SearchContainer";
import { useSearchContext } from "../SearchContext";

interface SearchPaginationStatusProps {
  totalCount: number;
}

export function SearchPaginationStatus({
  totalCount,
}: SearchPaginationStatusProps) {
  const t = useTranslations("search.SearchPaginationStatus");

  const { page, searchCategory } = useSearchContext();

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalCount);

  return (
    <span
      role="status"
      aria-live="polite"
      className="text-sm font-semibold text-black dark:text-white"
    >
      {searchCategory === "tasks" ? t("tasks") : t("projects")} {start}-{end}{" "}
      {t("of")} {totalCount}
    </span>
  );
}
