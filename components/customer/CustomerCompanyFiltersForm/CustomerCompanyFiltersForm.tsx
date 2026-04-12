"use client";

import {
  useCustomerFiltersForm,
  useCustomerFiltersFormDispatch,
} from "../CustomerFiltersForm/CustomerFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { FormBase } from "@/components/common/FormBase";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CompanyCheckboxGroup } from "@/components/company/CompanyCheckboxGroup";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

interface CustomerCompanyFiltersFormProps {
  companyCheckboxGroupItems: { id: number; name: string }[];
}

export function CustomerCompanyFiltersForm({
  companyCheckboxGroupItems,
}: CustomerCompanyFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedItems();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { companyIds } = useCustomerFiltersForm();
  const dispatch = useCustomerFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace companyIds: remove old ones and add the new values
    newSearchParams.delete("companyIds");
    companyIds.forEach((id) => newSearchParams.append("companyIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="customer-company-filters-form" onSubmit={handleSubmit}>
      <CompanyCheckboxGroup
        disableExpansion
        items={companyCheckboxGroupItems}
        value={companyIds}
        onChange={(value) =>
          dispatch({ type: "setCompanyIds", payload: value })
        }
      />
    </FormBase>
  );
}
