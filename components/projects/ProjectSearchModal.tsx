"use client";

import {
  SearchModal,
  SearchModalDialog,
  SearchModalDialogBody,
  SearchModalDialogHeader,
} from "@/components/search/SearchModal";
import { useTranslations } from "next-intl";
import { SearchBar } from "@/components/search/SearchBar";

interface ProjectSearchModalProps {
  searchContainer: React.ReactNode;
}

export function ProjectSearchModal({
  searchContainer,
}: ProjectSearchModalProps) {
  const t = useTranslations("projects.ProjectSearchModal");

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
