"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import { useSearchParams } from "next/navigation";
import { FormBase } from "@/components/common/FormBase";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { ProjectCreatorCheckboxGroup } from "../ProjectCreatorCheckboxGroup";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

interface ProjectCreatorFiltersFormProps {
  creatorCheckboxGroupItems: { id: string; fullName: string }[];
}

export function ProjectCreatorFiltersForm({
  creatorCheckboxGroupItems,
}: ProjectCreatorFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedProjects();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { creatorIds } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace creatorIds: remove old ones and add the new values
    newSearchParams.delete("creatorIds");
    creatorIds.forEach((id) => newSearchParams.append("creatorIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="project-creator-filters-form" onSubmit={handleSubmit}>
      <ProjectCreatorCheckboxGroup
        disableExpansion
        items={creatorCheckboxGroupItems}
        value={creatorIds}
        onChange={(value) =>
          dispatch({ type: "setCreatorIds", payload: value })
        }
      />
    </FormBase>
  );
}
