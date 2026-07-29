"use client";

import {
  ClientFiltersFormProvider,
  useClientFiltersFormDispatch,
} from "../ClientFiltersForm/ClientFiltersFormContext";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useClientFilters } from "../ClientFiltersContext";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { useModal } from "@/common/ModalManagerContext";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

interface ClientCompanyFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ClientCompanyFiltersModal({
  filtersFormContainer,
}: ClientCompanyFiltersModalProps) {
  const initialFilters = useClientFilters();
  const { isOpen, onOpenChange } = useModal("clientCompanyFilters");

  return (
    <FormBaseModal
      data-test="client-company-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ClientFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="client-company-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </ClientFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.clients.ClientCompanyFiltersModal");

  const dispatch = useClientFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setCompanyIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
