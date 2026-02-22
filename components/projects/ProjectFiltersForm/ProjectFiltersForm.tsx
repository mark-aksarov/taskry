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
import { ProjectFiltersFormNoActiveTasksSwitch } from "./ProjectFiltersFormNoActiveTasksSwitch";
import { ProjectFiltersFormDeadlineToDatePicker } from "./ProjectFiltersFormDeadlineToDatePicker";
import { ProjectFiltersFormDeadlineFromDatePicker } from "./ProjectFiltersFormDeadlineFromDatePicker";

interface ProjectFiltersFormProps {
  projectStatusCheckboxGroup: React.ReactNode;
  projectCategoryCheckboxGroup: React.ReactNode;
  customerCheckboxGroup: React.ReactNode;
  userCheckboxGroup: React.ReactNode;
}

export function ProjectFiltersForm({
  projectStatusCheckboxGroup,
  projectCategoryCheckboxGroup,
  customerCheckboxGroup,
  userCheckboxGroup,
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

        <div>{projectStatusCheckboxGroup}</div>
        <Separator />
        <div>{projectCategoryCheckboxGroup}</div>
        <Separator />
        <div>{customerCheckboxGroup}</div>
        <Separator />
        <div>{userCheckboxGroup}</div>
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
