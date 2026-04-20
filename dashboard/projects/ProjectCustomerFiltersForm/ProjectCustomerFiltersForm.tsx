"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm/ProjectFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { FormBase } from "@/dashboard/common/FormBase";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { CustomerCheckboxGroup } from "@/dashboard/customer/CustomerCheckboxGroup";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

interface ProjectCustomerFiltersFormProps {
  customerCheckboxGroupItems: { id: number; fullName: string }[];
}

export function ProjectCustomerFiltersForm({
  customerCheckboxGroupItems,
}: ProjectCustomerFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedProjects();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { customerIds } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace customerIds: remove old ones and add the new values
    newSearchParams.delete("customerIds");
    customerIds.forEach((id) => newSearchParams.append("customerIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="project-customer-filters-form" onSubmit={handleSubmit}>
      <CustomerCheckboxGroup
        disableExpansion
        items={customerCheckboxGroupItems}
        value={customerIds}
        onChange={(value) =>
          dispatch({ type: "setCustomerIds", payload: value })
        }
      />
    </FormBase>
  );
}
