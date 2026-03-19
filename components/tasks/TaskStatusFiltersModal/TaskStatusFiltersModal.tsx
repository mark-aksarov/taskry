import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  useTaskStatusCheckboxGroup,
  TaskStatusCheckboxGroupProvider,
} from "../TaskStatusCheckboxGroup";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { TaskStatusFiltersForm } from "../TaskStatusFiltersForm";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function TaskStatusFiltersModal() {
  const { statuses } = useTaskFilters();

  return (
    <FormBaseModal data-test="task-status-filters-modal">
      <TaskStatusCheckboxGroupProvider initialStatuses={statuses}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            <TaskStatusFiltersForm />
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </TaskStatusCheckboxGroupProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("tasks.TaskStatusFiltersModal");

  const { updateValue } = useTaskStatusCheckboxGroup();

  return (
    <FilterModalDialogHeader resetFilters={() => updateValue([])}>
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
