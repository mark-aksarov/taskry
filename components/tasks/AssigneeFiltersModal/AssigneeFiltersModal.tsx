"use client";

import {
  TaskFiltersFormProvider,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface AssigneeFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function AssigneeFiltersModal({
  filtersFormContainer,
}: AssigneeFiltersModalProps) {
  const initialFilters = useTaskFilters();
  const { isOpen, onOpenChange } = useModal("assigneeFilters");

  return (
    <FormBaseModal
      data-test="assignee-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <TaskFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="assignee-filters-form" />
          </DialogFooter>
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
