"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  TaskFiltersFormProvider,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm/TaskFiltersFormContext";

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
  const initialFilters = useTaskFilters();

  return (
    <FormBaseModal data-test="task-filters-modal">
      {
        // TaskFiltersFormProvider re-mount on each render, so it state is re-initialized
        // using values from TaskFiltersContext (derived from URL/search params)
      }
      <TaskFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </TaskFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("tasks.TaskFiltersModal");

  const dispatch = useTaskFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "resetFilters" })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
