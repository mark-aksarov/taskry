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
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface AssigneeFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function AssigneeFiltersModal({
  filtersFormContainer,
}: AssigneeFiltersModalProps) {
  const initialFilters = useTaskFilters();

  return (
    <FormBaseModal data-test="assignee-filters-modal">
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
  const t = useTranslations("tasks.AssigneeFiltersModal");

  const dispatch = useTaskFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setAssigneeIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
