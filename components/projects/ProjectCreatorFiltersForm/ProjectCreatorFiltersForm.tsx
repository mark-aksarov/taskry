"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSelectedProjects } from "../SelectedProjectsContext";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { ProjectFiltersFormUserCheckboxGroup } from "../ProjectFiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";

interface ProjectCreatorFiltersFormProps {
  creatorCheckboxGroupItems: { id: string; fullName: string }[];
}

export function ProjectCreatorFiltersForm({
  creatorCheckboxGroupItems,
}: ProjectCreatorFiltersFormProps) {
  const { clear: clearSelectedProjects } = useSelectedProjects();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems: clearSelectedProjects,
  });

  return (
    <FormBase id="project-creator-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectFiltersFormUserCheckboxGroup
          disableExpansion
          items={creatorCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
