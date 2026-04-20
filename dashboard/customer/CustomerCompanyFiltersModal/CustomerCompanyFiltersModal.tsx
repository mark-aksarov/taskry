"use client";

import {
  CustomerFiltersFormProvider,
  useCustomerFiltersFormDispatch,
} from "../CustomerFiltersForm/CustomerFiltersFormContext";

import { useTranslations } from "next-intl";
import { useCustomerFilters } from "../CustomerFiltersContext";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

interface CustomerCompanyFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function CustomerCompanyFiltersModal({
  filtersFormContainer,
}: CustomerCompanyFiltersModalProps) {
  const initialFilters = useCustomerFilters();
  const { isOpen, onOpenChange } = useModal("customerCompanyFilters");

  return (
    <FormBaseModal
      data-test="customer-company-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <CustomerFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="customer-company-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </CustomerFiltersFormProvider>
    </FormBaseModal>
  );
}

export function DialogHeader() {
  const t = useTranslations("dashboard.customers.CustomerCompanyFiltersModal");

  const dispatch = useCustomerFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setCompanyIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
