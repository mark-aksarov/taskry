import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useTaskFiltersDispatch } from "../TaskFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface TaskAssigneeFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskAssigneeFiltersModal({
  filtersFormContainer,
}: TaskAssigneeFiltersModalProps) {
  const t = useTranslations("tasks.TaskAssigneeFiltersModal");
  const dispatch = useTaskFiltersDispatch();

  return (
    <FormBaseModal data-test="task-assignee-filters-modal">
      <FilterModalDialog>
        <FilterModalDialogHeader
          resetFilters={() => dispatch({ type: "setAssignee", payload: [] })}
        >
          {t("heading")}
        </FilterModalDialogHeader>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
