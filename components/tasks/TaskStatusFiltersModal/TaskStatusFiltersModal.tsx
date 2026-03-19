"use client";

import {
  TaskFiltersFormProvider,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { TaskStatusFiltersForm } from "../TaskStatusFiltersForm";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function TaskStatusFiltersModal() {
  const initialFilters = useTaskFilters();

  return (
    <FormBaseModal data-test="task-status-filters-modal">
      <TaskFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            <TaskStatusFiltersForm />
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </TaskFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("tasks.TaskStatusFiltersModal");

  const dispatch = useTaskFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setStatuses", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
