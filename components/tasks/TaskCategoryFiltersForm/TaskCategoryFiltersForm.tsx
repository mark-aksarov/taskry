"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSelectedTasks } from "../SelectedTasksContext";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { TaskFiltersFormCategoryCheckboxGroup } from "../TaskFiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";

interface TaskCategoryFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
}

export function TaskCategoryFiltersForm({
  categoryCheckboxGroupItems,
}: TaskCategoryFiltersFormProps) {
  const { clear: clearSelectedTasks } = useSelectedTasks();

  const handleSubmit = useFiltersFormHandleSubmit({
    clearSelectedItems: clearSelectedTasks,
  });

  return (
    <FormBase id="task-category-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskFiltersFormCategoryCheckboxGroup
          items={categoryCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
