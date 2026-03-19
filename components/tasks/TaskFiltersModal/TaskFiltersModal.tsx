"use client";

import {
  useDeadlineToDatePicker,
  DeadlineToDatePickerProvider,
} from "../DeadlineToDatePicker";

import {
  useOnlyMyTasksSwitch,
  OnlyMyTasksSwitchProvider,
} from "../OnlyMyTasksSwitch";

import {
  useAssigneeCheckboxGroup,
  AssigneeCheckboxGroupProvider,
} from "../AssigneeCheckboxGroup";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  useProjectCheckboxGroup,
  ProjectCheckboxGroupProvider,
} from "@/components/projects/ProjectCheckboxGroup";

import {
  useTaskCategoryCheckboxGroup,
  TaskCategoryCheckboxGroupProvider,
} from "@/components/taskCategory/TaskCategoryCheckboxGroup";

import {
  useDeadlineFromDatePicker,
  DeadlineFromDatePickerProvider,
} from "../DeadlineFromDatePicker";

import {
  TaskStatusCheckboxGroupProvider,
  useTaskStatusCheckboxGroup,
} from "../TaskStatusCheckboxGroup";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface TaskFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskFiltersModal({
  filtersFormContainer,
}: TaskFiltersModalProps) {
  return (
    <FormBaseModal data-test="task-filters-modal">
      <Provider>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </Provider>
    </FormBaseModal>
  );
}

// Providers re-mount on each render, so their state is re-initialized
// using values from TaskFiltersContext (derived from URL/search params)
function Provider({ children }: { children: React.ReactNode }) {
  const {
    onlyMyTasks,
    assigneeIds,
    deadlineFrom,
    deadlineTo,
    categoryIds,
    projectIds,
    statuses,
  } = useTaskFilters();

  return (
    <OnlyMyTasksSwitchProvider initialValue={onlyMyTasks}>
      <DeadlineFromDatePickerProvider initialDate={deadlineFrom}>
        <DeadlineToDatePickerProvider initialDate={deadlineTo}>
          <TaskCategoryCheckboxGroupProvider initialCategoryIds={categoryIds}>
            <ProjectCheckboxGroupProvider initialProjectIds={projectIds}>
              <AssigneeCheckboxGroupProvider initialAssigneeIds={assigneeIds}>
                <TaskStatusCheckboxGroupProvider initialStatuses={statuses}>
                  {children}
                </TaskStatusCheckboxGroupProvider>
              </AssigneeCheckboxGroupProvider>
            </ProjectCheckboxGroupProvider>
          </TaskCategoryCheckboxGroupProvider>
        </DeadlineToDatePickerProvider>
      </DeadlineFromDatePickerProvider>
    </OnlyMyTasksSwitchProvider>
  );
}

function DialogHeader() {
  const t = useTranslations("tasks.TaskFiltersModal");

  const { updateValue: updateOnlyMyTasksSwitchValue } = useOnlyMyTasksSwitch();
  const { updateValue: updateDeadlineFromDatePickerValue } =
    useDeadlineFromDatePicker();
  const { updateValue: updateDeadlineToDatePickerValue } =
    useDeadlineToDatePicker();
  const { updateValue: updateAssigneeCheckboxGroupValue } =
    useAssigneeCheckboxGroup();
  const { updateValue: updateTaskCategoryCheckboxGroupValue } =
    useTaskCategoryCheckboxGroup();
  const { updateValue: updateProjectCheckboxGroupValue } =
    useProjectCheckboxGroup();
  const { updateValue: updateTaskStatusCheckboxGroupValue } =
    useTaskStatusCheckboxGroup();

  function resetFilters() {
    updateOnlyMyTasksSwitchValue(false);
    updateDeadlineFromDatePickerValue(null);
    updateDeadlineToDatePickerValue(null);
    updateAssigneeCheckboxGroupValue([]);
    updateTaskCategoryCheckboxGroupValue([]);
    updateProjectCheckboxGroupValue([]);
    updateTaskStatusCheckboxGroupValue([]);
  }

  return (
    <FilterModalDialogHeader resetFilters={resetFilters}>
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
