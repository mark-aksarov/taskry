import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useTaskFiltersDispatch } from "../TaskFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface TaskCategoryFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskCategoryFiltersModal({
  filtersFormContainer,
}: TaskCategoryFiltersModalProps) {
  const t = useTranslations("tasks.TaskCategoryFiltersModal");
  const dispatch = useTaskFiltersDispatch();

  return (
    <FormBaseModal data-test="task-category-filters-modal">
      <FilterModalDialog>
        <FilterModalDialogHeader
          resetFilters={() => dispatch({ type: "setCategory", payload: [] })}
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
