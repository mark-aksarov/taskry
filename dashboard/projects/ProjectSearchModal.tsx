"use client";

import {
  SearchModal,
  SearchModalDialog,
  SearchModalDialogBody,
  SearchModalDialogHeader,
} from "@/dashboard/search/SearchModal";
import { useTranslations } from "next-intl";
import { SearchBar } from "@/dashboard/search/SearchBar";

interface ProjectSearchModalProps {
  searchContainer: React.ReactNode;
}

export function ProjectSearchModal({
  searchContainer,
}: ProjectSearchModalProps) {
  const t = useTranslations("dashboard.projects.ProjectSearchModal");

  return (
    <SearchModal>
      <SearchModalDialog>
        <SearchModalDialogHeader>{t("heading")}</SearchModalDialogHeader>
        <SearchModalDialogBody>
          <SearchBar />
          {searchContainer}
        </SearchModalDialogBody>
      </SearchModalDialog>
    </SearchModal>
  );
}
