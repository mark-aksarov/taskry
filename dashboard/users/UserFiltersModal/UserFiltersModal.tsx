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
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

export function UserFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const initialFilters = useUserFilters();
  const { isOpen, onOpenChange } = useModal("userFilters");

  return (
    <FormBaseModal
      data-test="user-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <UserFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="user-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </UserFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.users.UserFiltersModal");

  const dispatch = useUserFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "resetFilters" })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
