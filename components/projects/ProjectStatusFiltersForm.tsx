"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSelectedProjects } from "./SelectedProjectsContext";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";
import { ProjectFiltersFormStatusCheckboxGroup } from "./ProjectFiltersForm";

export function ProjectStatusFiltersForm() {
  const { clear: clearSelectedProjects } = useSelectedProjects();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems: clearSelectedProjects,
  });

  return (
    <FormBase id="project-status-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectFiltersFormStatusCheckboxGroup />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
