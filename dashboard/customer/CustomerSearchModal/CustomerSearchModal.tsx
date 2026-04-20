"use client";

import {
  SearchModal,
  SearchModalDialog,
  SearchModalDialogBody,
  SearchModalDialogHeader,
} from "@/dashboard/search/SearchModal";
import { useTranslations } from "next-intl";
import { SearchBar } from "@/dashboard/search/SearchBar";

interface CustomerSearchModalProps {
  searchContainer: React.ReactNode;
}

export function CustomerSearchModal({
  searchContainer,
}: CustomerSearchModalProps) {
  const t = useTranslations("dashboard.customers.CustomerSearchModal");

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
