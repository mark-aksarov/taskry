"use client";

import {
  useCustomerFiltersForm,
  useCustomerFiltersFormDispatch,
} from "./CustomerFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { Separator } from "@/ui/Separator";
import { FormBase } from "@/dashboard/common/FormBase";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";
import { CompanyCheckboxGroup } from "@/dashboard/company/CompanyCheckboxGroup";
import { ActiveProjectsSwitch } from "@/dashboard/projects/ActiveProjectsSwitch";
import { OverdueProjectsSwitch } from "@/dashboard/projects/OverdueProjectsSwitch";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";
import { NoActiveProjectsSwitch } from "@/dashboard/projects/NoActiveProjectsSwitch";

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
      {companyCheckboxGroupItems.length > 0 && (
        <>
          <Separator />

          <CompanyCheckboxGroup
            items={companyCheckboxGroupItems}
            value={companyIds}
            onChange={(ids) =>
              dispatch({ type: "setCompanyIds", payload: ids })
            }
          />
        </>
      )}
    </FormBase>
  );
}
