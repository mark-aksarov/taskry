"use client";

import {
  SearchModal,
  SearchModalDialog,
  SearchModalDialogBody,
  SearchModalDialogHeader,
} from "@/components/search/SearchModal";
import { useTranslations } from "next-intl";
import { SearchBar } from "@/components/search/SearchBar";

interface TaskSearchModalProps {
  searchContainer: React.ReactNode;
}

export function TaskSearchModal({ searchContainer }: TaskSearchModalProps) {
  const t = useTranslations("tasks.TaskSearchModal");

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
