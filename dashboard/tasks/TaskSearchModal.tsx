"use client";

import {
  SearchModal,
  SearchModalDialog,
  SearchModalDialogBody,
  SearchModalDialogHeader,
} from "@/dashboard/search/SearchModal";
import { useTranslations } from "next-intl";
import { SearchBar } from "@/dashboard/search/SearchBar";

interface TaskSearchModalProps {
  searchContainer: React.ReactNode;
}

export function TaskSearchModal({ searchContainer }: TaskSearchModalProps) {
  const t = useTranslations("dashboard.tasks.TaskSearchModal");

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
