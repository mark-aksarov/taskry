"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm/ProjectFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { FormBase } from "@/dashboard/common/FormBase";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { ClientCheckboxGroup } from "@/dashboard/client/ClientCheckboxGroup";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

interface ProjectClientFiltersFormProps {
  clientCheckboxGroupItems: { id: number; fullName: string }[];
}

export function ProjectClientFiltersForm({
  clientCheckboxGroupItems,
}: ProjectClientFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedProjects();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { clientIds } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace clientIds: remove old ones and add the new values
    newSearchParams.delete("clientIds");
    clientIds.forEach((id) => newSearchParams.append("clientIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="project-client-filters-form" onSubmit={handleSubmit}>
      <ClientCheckboxGroup
        disableExpansion
        items={clientCheckboxGroupItems}
        value={clientIds}
        onChange={(value) =>
          dispatch({ type: "setClientIds", payload: value })
        }
      />
    </FormBase>
  );
}
