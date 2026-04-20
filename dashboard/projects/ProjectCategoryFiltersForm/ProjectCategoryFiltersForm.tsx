"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import { useSearchParams } from "next/navigation";
import { FormBase } from "@/dashboard/common/FormBase";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";
import { ProjectCategoryCheckboxGroup } from "@/dashboard/projectCategory/ProjectCategoryCheckboxGroup";

interface ProjectCategoryFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
}

export function ProjectCategoryFiltersForm({
  categoryCheckboxGroupItems,
}: ProjectCategoryFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedProjects();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { categoryIds } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace categoryIds: remove old ones and add the new values
    newSearchParams.delete("categoryIds");
    categoryIds.forEach((id) => newSearchParams.append("categoryIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="project-category-filters-form" onSubmit={handleSubmit}>
      <ProjectCategoryCheckboxGroup
        disableExpansion
        items={categoryCheckboxGroupItems}
        value={categoryIds}
        onChange={(value) =>
          dispatch({ type: "setCategoryIds", payload: value })
        }
      />
    </FormBase>
  );
}
