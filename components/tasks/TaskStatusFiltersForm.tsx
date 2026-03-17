"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSelectedTasks } from "./SelectedTasksContext";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";
import { TaskFiltersFormStatusCheckboxGroup } from "./TaskFiltersForm";

export function TaskStatusFiltersForm() {
  const { clear: clearSelectedTasks } = useSelectedTasks();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems: clearSelectedTasks,
  });

  return (
    <FormBase id="task-status-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskFiltersFormStatusCheckboxGroup />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
