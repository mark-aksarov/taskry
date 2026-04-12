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

interface TaskProjectFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskProjectFiltersModal({
  filtersFormContainer,
}: TaskProjectFiltersModalProps) {
  const initialFilters = useTaskFilters();
  const { isOpen, onOpenChange } = useModal("taskProjectFilters");

  return (
    <FormBaseModal
      data-test="task-project-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <TaskFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="task-project-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </TaskFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("tasks.TaskProjectFiltersModal");

  const dispatch = useTaskFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setProjectIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
