import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  useTaskCategoryCheckboxGroup,
  TaskCategoryCheckboxGroupProvider,
} from "@/components/taskCategory/TaskCategoryCheckboxGroup";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface TaskCategoryFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskCategoryFiltersModal({
  filtersFormContainer,
}: TaskCategoryFiltersModalProps) {
  const { categoryIds } = useTaskFilters();

  return (
    <FormBaseModal data-test="task-category-filters-modal">
      <TaskCategoryCheckboxGroupProvider initialCategoryIds={categoryIds}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </TaskCategoryCheckboxGroupProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("tasks.TaskCategoryFiltersModal");

  const { updateValue } = useTaskCategoryCheckboxGroup();

  return (
    <FilterModalDialogHeader resetFilters={() => updateValue([])}>
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
