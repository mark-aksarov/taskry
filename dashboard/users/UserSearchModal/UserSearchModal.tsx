"use client";

import {
  SearchModal,
  SearchModalDialog,
  SearchModalDialogBody,
  SearchModalDialogHeader,
} from "@/dashboard/search/SearchModal";
import { useTranslations } from "next-intl";
import { SearchBar } from "@/dashboard/search/SearchBar";

interface UserSearchModalProps {
  searchContainer: React.ReactNode;
}

export function UserSearchModal({ searchContainer }: UserSearchModalProps) {
  const t = useTranslations("dashboard.users.UserSearchModal");

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
