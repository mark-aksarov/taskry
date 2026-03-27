"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  UserFiltersFormProvider,
  useUserFiltersFormDispatch,
} from "../UserFiltersForm/UserFiltersFormContext";

import { useTranslations } from "next-intl";
import { useUserFilters } from "../UserFiltersContext";
import { useUserFiltersModal } from "./UserFiltersModalContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function UserFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const initialFilters = useUserFilters();
  const { isOpen, onOpenChange } = useUserFiltersModal();

  return (
    <FormBaseModal
      data-test="user-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <UserFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </UserFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("users.UserFiltersModal");

  const dispatch = useUserFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "resetFilters" })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
