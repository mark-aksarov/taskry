"use client";

import {
  useTaskFiltersForm,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm/TaskFiltersFormContext";

import { useSearchParams } from "next/navigation";
import { FormBase } from "@/dashboard/common/FormBase";
import { useSelectedTasks } from "../SelectedTasksContext";
import { AssigneeCheckboxGroup } from "../AssigneeCheckboxGroup";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { useFilterSubmitSideEffects } from "@/lib/hooks/useFilterSubmitSideEffects";

interface AssigneeFiltersFormProps {
  assigneeCheckboxGroupItems: { id: string; fullName: string }[];
}

export function AssigneeFiltersForm({
  assigneeCheckboxGroupItems,
}: AssigneeFiltersFormProps) {
  const searchParams = useSearchParams();
  const applyFilterURL = useApplyFilterURL();
  const { clear: clearSelectedItems } = useSelectedTasks();
  const runSubmitSideEffects = useFilterSubmitSideEffects({
    clearSelectedItems,
  });

  const { assigneeIds } = useTaskFiltersForm();
  const dispatch = useTaskFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run submit UI side effects
    runSubmitSideEffects();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace assigneeIds: remove old ones and add the new values
    newSearchParams.delete("assigneeIds");
    assigneeIds.forEach((id) => newSearchParams.append("assigneeIds", id));

    applyFilterURL(newSearchParams);
  };

  return (
    <FormBase id="assignee-filters-form" onSubmit={handleSubmit}>
      <AssigneeCheckboxGroup
        disableExpansion
        items={assigneeCheckboxGroupItems}
        value={assigneeIds}
        onChange={(value) =>
          dispatch({ type: "setAssigneeIds", payload: value })
        }
      />
    </FormBase>
  );
}
