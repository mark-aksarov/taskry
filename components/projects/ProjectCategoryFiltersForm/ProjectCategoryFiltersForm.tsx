"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSearchParams } from "next/navigation";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";
import { ProjectCategoryCheckboxGroup } from "@/components/projectCategory/ProjectCategoryCheckboxGroup";

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
    <FormBase id="project-category-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectCategoryCheckboxGroup
          disableExpansion
          items={categoryCheckboxGroupItems}
          value={categoryIds}
          onChange={(value) =>
            dispatch({ type: "setCategoryIds", payload: value })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
