"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  useCustomerFiltersForm,
  useCustomerFiltersFormDispatch,
} from "./CustomerFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/Separator";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { CompanyCheckboxGroup } from "@/components/company/CompanyCheckboxGroup";
import { ActiveProjectsSwitch } from "@/components/projects/ActiveProjectsSwitch";
import { OverdueProjectsSwitch } from "@/components/projects/OverdueProjectsSwitch";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";
import { NoActiveProjectsSwitch } from "@/components/projects/NoActiveProjectsSwitch";

interface CustomerFiltersFormProps {
  companyCheckboxGroupItems: { id: number; name: string }[];
}

export function CustomerFiltersForm({
  companyCheckboxGroupItems,
}: CustomerFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedItems();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const {
    companyIds,
    hasActiveProjects,
    hasOverdueProjects,
    hasNoActiveProjects,
  } = useCustomerFiltersForm();
  const dispatch = useCustomerFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Remove old filter values before applying new ones
    newSearchParams.delete("hasActiveProjects");
    newSearchParams.delete("hasOverdueProjects");
    newSearchParams.delete("hasNoActiveProjects");
    newSearchParams.delete("companyIds");

    // Add boolean filters if they are selected
    if (hasActiveProjects) {
      newSearchParams.set("hasActiveProjects", "true");
    }

    if (hasOverdueProjects) {
      newSearchParams.set("hasOverdueProjects", "true");
    }

    if (hasNoActiveProjects) {
      newSearchParams.set("hasNoActiveProjects", "true");
    }

    // Add selected company IDs
    companyIds.forEach((id) => newSearchParams.append("companyIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="customer-filters-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <NoActiveProjectsSwitch
          isSelected={hasNoActiveProjects}
          onChange={(value) =>
            dispatch({ type: "changeHasNoActiveProjects", payload: value })
          }
        />
        <Separator />

        <ActiveProjectsSwitch
          isSelected={hasActiveProjects}
          onChange={(value) =>
            dispatch({ type: "changeHasActiveProjects", payload: value })
          }
        />
        <Separator />

        <OverdueProjectsSwitch
          isSelected={hasOverdueProjects}
          onChange={(value) =>
            dispatch({ type: "changeHasOverdueProjects", payload: value })
          }
        />
        <Separator />

        <CompanyCheckboxGroup
          items={companyCheckboxGroupItems}
          value={companyIds}
          onChange={(ids) => dispatch({ type: "setCompanyIds", payload: ids })}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
