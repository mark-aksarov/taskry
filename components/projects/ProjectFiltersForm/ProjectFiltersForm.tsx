"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { Separator } from "@/components/ui/Separator";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useProjectFiltersDispatch } from "../ProjectFiltersContext";
import { FiltersFormResetButton } from "@/components/common/FiltersForm";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";
import { ProjectFiltersFormUserCheckboxGroup } from "./ProjectFiltersFormUserCheckboxGroup";
import { ProjectFiltersFormNoActiveTasksSwitch } from "./ProjectFiltersFormNoActiveTasksSwitch";
import { ProjectFiltersFormStatusCheckboxGroup } from "./ProjectFiltersFormStatusCheckboxGroup";
import { ProjectFiltersFormDeadlineToDatePicker } from "./ProjectFiltersFormDeadlineToDatePicker";
import { ProjectFiltersFormCategoryCheckboxGroup } from "./ProjectFiltersFormCategoryCheckboxGroup";
import { ProjectFiltersFormCustomerCheckboxGroup } from "./ProjectFiltersFormCustomerCheckboxGroup";
import { ProjectFiltersFormDeadlineFromDatePicker } from "./ProjectFiltersFormDeadlineFromDatePicker";

interface ProjectFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
  userCheckboxGroupItems: { id: string; fullName: string }[];
  customerCheckboxGroupItems: { id: number; fullName: string }[];
}

export function ProjectFiltersForm({
  categoryCheckboxGroupItems,
  userCheckboxGroupItems,
  customerCheckboxGroupItems,
}: ProjectFiltersFormProps) {
  const { clear: clearSelectedProjects } = useSelectedProjects();
  const dispatch = useProjectFiltersDispatch();

  const handleSubmit = useFiltersFormHandleSubmit({
    booleanFieldNames: ["noActiveTasks"],
    clearSelectedItems: clearSelectedProjects,
  });

  return (
    <FormBase id="project-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectFiltersFormNoActiveTasksSwitch />
        <Separator />

        <ProjectFiltersFormDeadlineFromDatePicker />
        <ProjectFiltersFormDeadlineToDatePicker />
        <Separator />

        <ProjectFiltersFormStatusCheckboxGroup />
        <Separator />

        <ProjectFiltersFormCategoryCheckboxGroup
          categories={categoryCheckboxGroupItems}
        />
        <Separator />

        <ProjectFiltersFormCustomerCheckboxGroup
          items={customerCheckboxGroupItems}
        />
        <Separator />

        <ProjectFiltersFormUserCheckboxGroup items={userCheckboxGroupItems} />
      </FormBaseBody>

      <FormBaseFooter>
        <FiltersFormSubmitButton />
        <FiltersFormResetButton
          onPress={() => dispatch({ type: "resetFilters" })}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
