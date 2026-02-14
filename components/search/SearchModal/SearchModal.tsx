"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SearchField } from "../SearchField";
import { SearchModalContext } from "./SearchModalContext";
import { Dialog, DialogHeader } from "@/components/ui/Dialog";
import { SearchToggleButtonGroup } from "../SearchToggleButtonGroup";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

type SearchCategory = "users" | "projects" | "tasks" | "customers";

interface SearchModalProps {
  tasksSearchContainer: React.ReactNode;
  projectsSearchContainer: React.ReactNode;
}

export function SearchModal({
  tasksSearchContainer,
  projectsSearchContainer,
}: SearchModalProps) {
  const t = useTranslations("search.SearchModal");

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("tasks");

  const searchField = (
    <SearchField
      value={query}
      onChange={(value) => {
        setPage(1);
        setQuery(value);
      }}
    />
  );

  const searchToggleButtonGroup = (
    <SearchToggleButtonGroup
      onSelectionChange={(keys) => {
        setPage(1);
        setSearchCategory([...keys][0] as SearchCategory);
      }}
      selectedKeys={[searchCategory]}
    />
  );

  const contextValue = useMemo(
    () => ({
      query,
      page,
      setPage,
      searchField,
      searchToggleButtonGroup,
    }),
    [page, query, searchCategory],
  );

  return (
    <ResponsiveModal
      data-test="search-modal"
      isDismissable
      className="md:w-[600px]"
    >
      <Dialog className="md:h-[calc(100dvh-64px)]">
        <DialogHeader>{t("dialogHeading")}</DialogHeader>

        <SearchModalContext.Provider value={contextValue}>
          {searchCategory === "tasks" && tasksSearchContainer}
          {searchCategory === "projects" && projectsSearchContainer}
        </SearchModalContext.Provider>
      </Dialog>
    </ResponsiveModal>
  );
}
