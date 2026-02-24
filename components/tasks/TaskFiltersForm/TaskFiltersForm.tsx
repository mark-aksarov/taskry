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
import { TaskFiltersFormStatusCheckboxGroup } from "./TaskFiltersFormStatusCheckboxGroup";
import { TaskFiltersFormDeadlineToDatePicker } from "./TaskFiltersFormDeadlineToDatePicker";
import { TaskFiltersFormProjectCheckboxGroup } from "./TaskFiltersFormProjectCheckboxGroup";
import { TaskFiltersFormCategoryCheckboxGroup } from "./TaskFiltersFormCategoryCheckboxGroup";
import { TaskFiltersFormAssigneeCheckboxGroup } from "./TaskFiltersFormAssigneeCheckboxGroup";
import { TaskFiltersFormDeadlineFromDatePicker } from "./TaskFiltersFormDeadlineFromDatePicker";

interface TaskFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
  projectCheckboxGroupItems: { id: number; title: string }[];
  assigneeCheckboxGroupItems: { id: string; fullName: string }[];
}

export function TaskFiltersForm({
  categoryCheckboxGroupItems,
  projectCheckboxGroupItems,
  assigneeCheckboxGroupItems,
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

        <TaskFiltersFormStatusCheckboxGroup />
        <Separator />

        <TaskFiltersFormCategoryCheckboxGroup
          categories={categoryCheckboxGroupItems}
        />
        <Separator />

        <TaskFiltersFormProjectCheckboxGroup
          projects={projectCheckboxGroupItems}
        />
        <Separator />

        <TaskFiltersFormAssigneeCheckboxGroup
          users={assigneeCheckboxGroupItems}
        />
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
