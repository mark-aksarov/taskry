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
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function CustomerFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const initialFilters = useCustomerFilters();

  return (
    <FormBaseModal data-test="customer-filters-modal">
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

function DialogHeader() {
  const t = useTranslations("customers.CustomerFiltersModal");

  const dispatch = useCustomerFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "resetFilters" })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
