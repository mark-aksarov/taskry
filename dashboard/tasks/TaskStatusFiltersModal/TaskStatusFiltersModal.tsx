"use client";

import {
  TaskFiltersFormProvider,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { TaskStatusFiltersForm } from "../TaskStatusFiltersForm";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

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
  const t = useTranslations("dashboard.tasks.TaskStatusFiltersModal");

  const dispatch = useTaskFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setStatuses", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
