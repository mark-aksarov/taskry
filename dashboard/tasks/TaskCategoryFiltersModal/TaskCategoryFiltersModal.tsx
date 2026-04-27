"use client";

import {
  TaskFiltersFormProvider,
  useTaskFiltersFormDispatch,
} from "../TaskFiltersForm";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

interface TaskCategoryFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskCategoryFiltersModal({
  filtersFormContainer,
}: TaskCategoryFiltersModalProps) {
  const initialFilters = useTaskFilters();
  const { isOpen, onOpenChange } = useModal("taskCategoryFilters");

  return (
    <FormBaseModal
      data-test="task-category-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <TaskFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="task-category-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </TaskFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.tasks.TaskCategoryFiltersModal");

  const dispatch = useTaskFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setCategoryIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
