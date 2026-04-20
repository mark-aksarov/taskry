"use client";

import {
  ProjectFiltersFormProvider,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { ProjectStatusFiltersForm } from "../ProjectStatusFiltersForm";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

export function ProjectStatusFiltersModal() {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useModal("projectStatusFilters");

  return (
    <FormBaseModal
      data-test="project-status-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ProjectFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>
            <ProjectStatusFiltersForm />
          </DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="project-status-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </ProjectFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.projects.ProjectStatusFiltersModal");

  const dispatch = useProjectFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setStatuses", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
