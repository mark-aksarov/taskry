import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useTaskFiltersDispatch } from "../TaskFiltersContext";
import { TaskStatusFiltersForm } from "../TaskStatusFiltersForm";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function TaskStatusFiltersModal() {
  const t = useTranslations("tasks.TaskStatusFiltersModal");
  const dispatch = useTaskFiltersDispatch();

  return (
    <FormBaseModal data-test="task-status-filters-modal">
      <FilterModalDialog>
        <FilterModalDialogHeader
          resetFilters={() => dispatch({ type: "setStatus", payload: [] })}
        >
          {t("heading")}
        </FilterModalDialogHeader>
        <FormBaseModalDialogBody>
          <TaskStatusFiltersForm />
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
