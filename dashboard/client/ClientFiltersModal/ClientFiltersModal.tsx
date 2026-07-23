"use client";

import {
  ClientFiltersFormProvider,
  useClientFiltersFormDispatch,
} from "../ClientFiltersForm/ClientFiltersFormContext";

import { useTranslations } from "next-intl";
import { useClientFilters } from "../ClientFiltersContext";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

export function ClientFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const initialFilters = useClientFilters();
  const { isOpen, onOpenChange } = useModal("clientFilters");

  return (
    <FormBaseModal
      data-test="client-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ClientFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="client-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </ClientFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.clients.ClientFiltersModal");

  const dispatch = useClientFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "resetFilters" })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
