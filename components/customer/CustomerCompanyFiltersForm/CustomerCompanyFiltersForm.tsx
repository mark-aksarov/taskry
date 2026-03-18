"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CustomerFiltersFormCompanyCheckboxGroup } from "../CustomerFiltersForm/CustomerFiltersFormCompanyCheckboxGroup";

interface CustomerCompanyFiltersFormProps {
  companyCheckboxGroupItems: { id: number; name: string }[];
}

export function CustomerCompanyFiltersForm({
  companyCheckboxGroupItems,
}: CustomerCompanyFiltersFormProps) {
  const { clear: clearSelectedItems } = useSelectedItems();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems,
  });

  return (
    <FormBase id="customer-company-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <CustomerFiltersFormCompanyCheckboxGroup
          disableExpansion
          items={companyCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
