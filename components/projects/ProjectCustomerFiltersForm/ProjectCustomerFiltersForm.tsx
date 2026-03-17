"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSelectedProjects } from "../SelectedProjectsContext";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { ProjectFiltersFormCustomerCheckboxGroup } from "../ProjectFiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";

interface ProjectCustomerFiltersFormProps {
  customerCheckboxGroupItems: { id: number; fullName: string }[];
}

export function ProjectCustomerFiltersForm({
  customerCheckboxGroupItems,
}: ProjectCustomerFiltersFormProps) {
  const { clear: clearSelectedProjects } = useSelectedProjects();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems: clearSelectedProjects,
  });

  return (
    <FormBase id="project-customer-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectFiltersFormCustomerCheckboxGroup
          items={customerCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
