"use client";

import {
  useTaskFiltersForm,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm/TaskFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { FormBase } from "@/dashboard/common/FormBase";
import { useSelectedTasks } from "../SelectedTasksContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";
import { TaskCategoryCheckboxGroup } from "@/dashboard/taskCategory/TaskCategoryCheckboxGroup";

interface TaskCategoryFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
}

export function TaskCategoryFiltersForm({
  categoryCheckboxGroupItems,
}: TaskCategoryFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedTasks();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { categoryIds } = useTaskFiltersForm();
  const dispatch = useTaskFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace categoryIds: remove old ones and add the new values
    newSearchParams.delete("categoryIds");
    categoryIds.forEach((id) => newSearchParams.append("categoryIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="task-category-filters-form" onSubmit={handleSubmit}>
      <TaskCategoryCheckboxGroup
        disableExpansion
        items={categoryCheckboxGroupItems}
        value={categoryIds}
        onChange={(value) =>
          dispatch({ type: "setAssigneeIds", payload: value })
        }
      />
    </FormBase>
  );
}
