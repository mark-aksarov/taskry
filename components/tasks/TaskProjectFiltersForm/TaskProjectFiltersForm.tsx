"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSelectedTasks } from "../SelectedTasksContext";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { TaskFiltersFormProjectCheckboxGroup } from "../TaskFiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";

interface TaskProjectFiltersFormProps {
  projectCheckboxGroupItems: { id: number; title: string }[];
}

export function TaskProjectFiltersForm({
  projectCheckboxGroupItems,
}: TaskProjectFiltersFormProps) {
  const { clear: clearSelectedTasks } = useSelectedTasks();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems: clearSelectedTasks,
  });

  return (
    <FormBase id="task-project-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskFiltersFormProjectCheckboxGroup
          disableExpansion
          items={projectCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
