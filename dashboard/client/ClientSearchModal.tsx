"use client";

import {
  SearchModal,
  SearchModalDialog,
  SearchModalDialogBody,
  SearchModalDialogHeader,
} from "@/dashboard/search/SearchModal";
import { useTranslations } from "next-intl";
import { SearchBar } from "@/dashboard/search/SearchBar";

interface ClientSearchModalProps {
  searchContainer: React.ReactNode;
}

export function ClientSearchModal({
  searchContainer,
}: ClientSearchModalProps) {
  const t = useTranslations("dashboard.clients.ClientSearchModal");

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
