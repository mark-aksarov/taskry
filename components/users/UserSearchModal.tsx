"use client";

import {
  SearchModal,
  SearchModalDialog,
  SearchModalDialogBody,
  SearchModalDialogHeader,
} from "@/components/search/SearchModal";
import { useTranslations } from "next-intl";
import { SearchBar } from "@/components/search/SearchBar";

interface UserSearchModalProps {
  searchContainer: React.ReactNode;
}

export function UserSearchModal({ searchContainer }: UserSearchModalProps) {
  const t = useTranslations("users.UserSearchModal");

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
