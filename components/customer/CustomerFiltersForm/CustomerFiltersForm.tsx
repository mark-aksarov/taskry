"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { Separator } from "@/components/ui/Separator";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";
import { CustomerFiltersFormActiveProjectsSwitch } from "./CustomerFiltersFormActiveProjectsSwitch";
import { CustomerFiltersFormCompanyCheckboxGroup } from "./CustomerFiltersFormCompanyCheckboxGroup";
import { CustomerFiltersFormOverdueProjectsSwitch } from "./CustomerFiltersFormOverdueProjectsSwitch";
import { CustomerFiltersFormNoActiveProjectsSwitch } from "./CustomerFiltersFormNoActiveProjectsSwitch";

interface CustomerFiltersFormProps {
  companyCheckboxGroupItems: { id: number; name: string }[];
}

export function CustomerFiltersForm({
  companyCheckboxGroupItems,
}: CustomerFiltersFormProps) {
  const { clear: clearSelectedItems } = useSelectedItems();

  const handleSubmit = useFiltersFormHandleSubmit({
    booleanFieldNames: [
      "hasActiveProjects",
      "hasOverdueProjects",
      "hasNoActiveProjects",
    ],
    clearSelectedItems: clearSelectedItems,
  });

  return (
    <FormBase id="customer-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <CustomerFiltersFormNoActiveProjectsSwitch />
        <Separator />

        <CustomerFiltersFormActiveProjectsSwitch />
        <Separator />

        <CustomerFiltersFormOverdueProjectsSwitch />
        <Separator />

        <CustomerFiltersFormCompanyCheckboxGroup
          items={companyCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
