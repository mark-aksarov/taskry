"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { Separator } from "@/components/ui/Separator";
import { useSelectedTasks } from "../SelectedTasksContext";
import { useTaskFiltersDispatch } from "../TaskFiltersContext";
import { FiltersFormResetButton } from "@/components/common/FiltersForm";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useFiltersFormHandleSubmit } from "@/components/common/FiltersForm";
import { TaskFiltersFormOnlyMyTaskSwitch } from "./TaskFiltersFormOnlyMyTaskSwitch";
import { TaskFiltersFormDeadlineToDatePicker } from "./TaskFiltersFormDeadlineToDatePicker";
import { TaskFiltersFormDeadlineFromDatePicker } from "./TaskFiltersFormDeadlineFromDatePicker";

interface TaskFiltersFormProps {
  statusCheckboxGroup: React.ReactNode;
  categoryCheckboxGroup: React.ReactNode;
  projectCheckboxGroup: React.ReactNode;
  assigneeCheckboxGroup: React.ReactNode;
}

export function TaskFiltersForm({
  statusCheckboxGroup,
  categoryCheckboxGroup,
  projectCheckboxGroup,
  assigneeCheckboxGroup,
}: TaskFiltersFormProps) {
  const { clear: clearSelectedTasks } = useSelectedTasks();
  const dispatch = useTaskFiltersDispatch();

  const handleSubmit = useFiltersFormHandleSubmit({
    booleanFieldNames: ["onlyMyTasks"],
    clearSelectedItems: clearSelectedTasks,
  });

  return (
    <FormBase id="task-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskFiltersFormOnlyMyTaskSwitch />

        <Separator />

        <TaskFiltersFormDeadlineFromDatePicker />
        <TaskFiltersFormDeadlineToDatePicker />

        <Separator />

        <div>{statusCheckboxGroup}</div>
        <Separator />
        <div>{categoryCheckboxGroup}</div>
        <Separator />
        <div>{projectCheckboxGroup}</div>
        <Separator />
        <div>{assigneeCheckboxGroup}</div>
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
