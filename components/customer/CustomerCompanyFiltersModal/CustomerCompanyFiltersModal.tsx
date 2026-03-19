"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  useCompanyCheckboxGroup,
  CompanyCheckboxGroupProvider,
} from "@/components/company/CompanyCheckboxGroup";

import { useTranslations } from "next-intl";
import { useCustomerFilters } from "../CustomerFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface CustomerCompanyFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function CustomerCompanyFiltersModal({
  filtersFormContainer,
}: CustomerCompanyFiltersModalProps) {
  const { companyIds } = useCustomerFilters();

  return (
    <FormBaseModal data-test="customer-company-filters-modal">
      <CompanyCheckboxGroupProvider
        initialValue={companyIds ? companyIds.map((id) => id.toString()) : []}
      >
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </CompanyCheckboxGroupProvider>
    </FormBaseModal>
  );
}

export function DialogHeader() {
  const t = useTranslations("customers.CustomerCompanyFiltersModal");

  const { updateValue } = useCompanyCheckboxGroup();

  return (
    <FilterModalDialogHeader resetFilters={() => updateValue([])}>
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
