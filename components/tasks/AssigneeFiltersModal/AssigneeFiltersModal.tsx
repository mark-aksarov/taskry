"use client";

import {
  useAssigneeCheckboxGroup,
  AssigneeCheckboxGroupProvider,
} from "../AssigneeCheckboxGroup";

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
  const { assigneeIds } = useTaskFilters();

  return (
    <FormBaseModal data-test="assignee-filters-modal">
      <AssigneeCheckboxGroupProvider initialAssigneeIds={assigneeIds}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </AssigneeCheckboxGroupProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("tasks.AssigneeFiltersModal");

  const { updateValue } = useAssigneeCheckboxGroup();

  return (
    <FilterModalDialogHeader resetFilters={() => updateValue([])}>
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
