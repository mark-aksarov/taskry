"use client";

import {
  ProjectFiltersFormProvider,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { useModal } from "@/components/common/ModalManagerContext";
import { ProjectStatusFiltersForm } from "../ProjectStatusFiltersForm";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

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
  const t = useTranslations("projects.ProjectStatusFiltersModal");

  const dispatch = useProjectFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setStatuses", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
