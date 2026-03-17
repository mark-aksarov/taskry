"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSelectedProjects } from "../SelectedProjectsContext";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { ProjectFiltersFormCategoryCheckboxGroup } from "../ProjectFiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";

interface ProjectCategoryFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
}

export function ProjectCategoryFiltersForm({
  categoryCheckboxGroupItems,
}: ProjectCategoryFiltersFormProps) {
  const { clear: clearSelectedProjects } = useSelectedProjects();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems: clearSelectedProjects,
  });

  return (
    <FormBase id="project-category-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectFiltersFormCategoryCheckboxGroup
          items={categoryCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
