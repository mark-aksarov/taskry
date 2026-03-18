"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";

export function UserFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const t = useTranslations("users.UserFiltersModal");

  return (
    <FormBaseModal data-test="user-filters-modal">
      <FilterModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
