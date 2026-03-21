"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "./ProjectFiltersForm";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSearchParams } from "next/navigation";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useSelectedProjects } from "./SelectedProjectsContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { ProjectStatusCheckboxGroup } from "./ProjectStatusCheckboxGroup";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

export function ProjectStatusFiltersForm() {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedProjects();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { statuses } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace statuses: remove old ones and add the new values
    newSearchParams.delete("statuses");
    statuses.forEach((status) => newSearchParams.append("statuses", status));

    // Reset pagination
    newSearchParams.delete("page");

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="project-status-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectStatusCheckboxGroup
          value={statuses}
          onChange={(value) =>
            dispatch({ type: "setStatuses", payload: value as ProjectStatus[] })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
