"use client";

import {
  UserFiltersFormProvider,
  useUserFiltersFormDispatch,
} from "../UserFiltersForm/UserFiltersFormContext";

import { useTranslations } from "next-intl";
import { useUserFilters } from "../UserFiltersContext";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { useModal } from "@/common/ModalManagerContext";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";

interface UserPositionFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function UserPositionFiltersModal({
  filtersFormContainer,
}: UserPositionFiltersModalProps) {
  const initialFilters = useUserFilters();
  const { isOpen, onOpenChange } = useModal("userPositionFilters");

  return (
    <FormBaseModal
      data-test="user-position-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <UserFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="user-position-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </UserFiltersFormProvider>
    </FormBaseModal>
  );
}

export function DialogHeader() {
  const t = useTranslations("dashboard.users.UserPositionFiltersModal");

  const dispatch = useUserFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setPositionIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
