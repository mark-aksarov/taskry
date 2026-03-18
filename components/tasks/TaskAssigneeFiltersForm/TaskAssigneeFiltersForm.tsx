"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSelectedTasks } from "../SelectedTasksContext";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { TaskFiltersFormAssigneeCheckboxGroup } from "../TaskFiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";

interface TaskAssigneeFiltersFormProps {
  assigneeCheckboxGroupItems: { id: string; fullName: string }[];
}

export function TaskAssigneeFiltersForm({
  assigneeCheckboxGroupItems,
}: TaskAssigneeFiltersFormProps) {
  const { clear: clearSelectedTasks } = useSelectedTasks();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems: clearSelectedTasks,
  });

  return (
    <FormBase id="task-assignee-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskFiltersFormAssigneeCheckboxGroup
          disableExpansion
          items={assigneeCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
