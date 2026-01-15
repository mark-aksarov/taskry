"use client";

import {
  Dialog,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { useState } from "react";
import { SearchField } from "./SearchField";
import { useTranslations } from "next-intl";
import { SearchToggleButtonGroup } from "./SearchToggleButtonGroup";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { useGlobalContainer } from "../layout/GlobalContainerContext";

type SearchCategory = "users" | "projects" | "tasks";

export function SearchModal() {
  const t = useTranslations("search.SearchModal");

  const {
    UsersSearchContainer,
    TasksSearchContainer,
    ProjectsSearchContainer,
  } = useGlobalContainer();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("users");

  if (
    !UsersSearchContainer ||
    !TasksSearchContainer ||
    !ProjectsSearchContainer
  ) {
    throw new Error("SearchContainer is missing in GlobalContainerContext");
  }

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

  return (
    <ResponsiveModal
      data-test="search-modal"
      isDismissable
      className="w-[600px]"
    >
      <Dialog className="md:h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{t("dialogHeading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>

        {searchCategory === "users" && (
          <UsersSearchContainer
            query={query}
            page={page}
            setPage={setPage}
            searchField={searchField}
            searchToggleButtonGroup={searchToggleButtonGroup}
          />
        )}

        {searchCategory === "tasks" && (
          <TasksSearchContainer
            query={query}
            page={page}
            setPage={setPage}
            searchField={searchField}
            searchToggleButtonGroup={searchToggleButtonGroup}
          />
        )}

        {searchCategory === "projects" && (
          <ProjectsSearchContainer
            query={query}
            page={page}
            setPage={setPage}
            searchField={searchField}
            searchToggleButtonGroup={searchToggleButtonGroup}
          />
        )}
      </Dialog>
    </ResponsiveModal>
  );
}
