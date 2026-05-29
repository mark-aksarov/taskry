"use client";

import {
  useTaskFiltersForm,
  useTaskFiltersFormDispatch,
} from "./TaskFiltersForm";

import { useSearchParams } from "next/navigation";
import { TaskStatus } from "@/generated/prisma/enums";
import { FormBase } from "@/dashboard/common/FormBase";
import { useSelectedTasks } from "./SelectedTasksContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { TaskStatusCheckboxGroup } from "./TaskStatusCheckboxGroup";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

export function TaskStatusFiltersForm() {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedTasks();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { statuses } = useTaskFiltersForm();
  const dispatch = useTaskFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace status: remove old ones and add the new values
    newSearchParams.delete("statuses");
    statuses.forEach((status) => newSearchParams.append("statuses", status));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="task-status-filters-form" onSubmit={handleSubmit}>
      <TaskStatusCheckboxGroup
        value={statuses}
        onChange={(value) =>
          dispatch({ type: "setStatuses", payload: value as TaskStatus[] })
        }
      />
    </FormBase>
  );
}
