"use client";

import {
  Dialog,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { useMemo, useState } from "react";
import { SearchField } from "../SearchField";
import { useTranslations } from "next-intl";
import { SearchModalContext } from "./SearchModalContext";
import { SearchToggleButtonGroup } from "../SearchToggleButtonGroup";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

type SearchCategory = "users" | "projects" | "tasks";

interface SearchModalProps {
  usersSearchContainer: React.ReactNode;
  tasksSearchContainer: React.ReactNode;
  projectsSearchContainer: React.ReactNode;
}

export function SearchModal({
  usersSearchContainer,
  tasksSearchContainer,
  projectsSearchContainer,
}: SearchModalProps) {
  const t = useTranslations("search.SearchModal");

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("users");

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
      className="w-[600px]"
    >
      <Dialog className="md:h-[calc(100dvh-64px)]">
        <DialogHeader>{t("dialogHeading")}</DialogHeader>

        <SearchModalContext.Provider value={contextValue}>
          {searchCategory === "users" && usersSearchContainer}
          {searchCategory === "tasks" && tasksSearchContainer}
          {searchCategory === "projects" && projectsSearchContainer}
        </SearchModalContext.Provider>
      </Dialog>
    </ResponsiveModal>
  );
}
