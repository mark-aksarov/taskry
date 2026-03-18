"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUserFiltersDispatch } from "../UserFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function UserFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const t = useTranslations("users.UserFiltersModal");
  const dispatch = useUserFiltersDispatch();

  return (
    <FormBaseModal data-test="user-filters-modal">
      <FilterModalDialog>
        <FilterModalDialogHeader
          resetFilters={() => dispatch({ type: "resetFilters" })}
        >
          {t("heading")}
        </FilterModalDialogHeader>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
