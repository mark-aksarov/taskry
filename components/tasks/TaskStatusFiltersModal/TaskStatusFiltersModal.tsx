"use client";

import {
  TaskFiltersFormProvider,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { TaskStatusFiltersForm } from "../TaskStatusFiltersForm";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function TaskStatusFiltersModal() {
  const initialFilters = useTaskFilters();
  const { isOpen, onOpenChange } = useModal("taskStatusFilters");

  return (
    <FormBaseModal
      data-test="task-status-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <TaskFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>
            <TaskStatusFiltersForm />
          </DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="task-status-filters-form" />
          </DialogFooter>
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
