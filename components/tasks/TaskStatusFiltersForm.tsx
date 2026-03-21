"use client";

import {
  useTaskFiltersForm,
  useTaskFiltersFormDispatch,
} from "./TaskFiltersForm";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useSearchParams } from "next/navigation";
import { TaskStatus } from "@/generated/prisma/enums";
import { useSelectedTasks } from "./SelectedTasksContext";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { TaskStatusCheckboxGroup } from "./TaskStatusCheckboxGroup";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
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
    newSearchParams.delete("status");
    statuses.forEach((status) => newSearchParams.append("status", status));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="task-status-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskStatusCheckboxGroup
          value={statuses}
          onChange={(value) =>
            dispatch({ type: "setStatuses", payload: value as TaskStatus[] })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
