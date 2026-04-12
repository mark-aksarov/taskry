"use client";

import {
  TaskFiltersFormProvider,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm/TaskFiltersFormContext";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

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
