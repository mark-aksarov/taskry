"use client";

import {
  TaskFiltersFormProvider,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm/TaskFiltersFormContext";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

interface TaskFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskFiltersModal({
  filtersFormContainer,
}: TaskFiltersModalProps) {
  const initialFilters = useTaskFilters();
  const { isOpen, onOpenChange } = useModal("taskFilters");

  return (
    <FormBaseModal
      data-test="task-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {
        // TaskFiltersFormProvider re-mount on each render, so it state is re-initialized
        // using values from TaskFiltersContext (derived from URL/search params)
      }
      <TaskFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="task-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </TaskFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.tasks.TaskFiltersModal");

  const dispatch = useTaskFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "resetFilters" })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
