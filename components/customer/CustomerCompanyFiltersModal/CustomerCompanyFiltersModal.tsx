"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  CustomerFiltersFormProvider,
  useCustomerFiltersFormDispatch,
} from "../CustomerFiltersForm/CustomerFiltersFormContext";

import { useTranslations } from "next-intl";
import { useCustomerFilters } from "../CustomerFiltersContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

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
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </CustomerFiltersFormProvider>
    </FormBaseModal>
  );
}

export function DialogHeader() {
  const t = useTranslations("customers.CustomerCompanyFiltersModal");

  const dispatch = useCustomerFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setCompanyIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
