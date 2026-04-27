"use client";

import {
  ProjectFiltersFormProvider,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm/ProjectFiltersFormContext";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

export function ProjectFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useModal("projectFilters");

  return (
    <FormBaseModal
      data-test="project-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {
        // Providers re-mount on each render, so their state is re-initialized
        // using values from ProjectFiltersContext (derived from URL/search params)
      }
      <ProjectFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="project-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </ProjectFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.projects.ProjectFiltersModal");

  const dispatch = useProjectFiltersFormDispatch();

  function resetFilters() {
    dispatch({ type: "resetFilters" });
  }

  return (
    <FilterModalDialogHeader resetFilters={resetFilters}>
      {t("title")}
    </FilterModalDialogHeader>
  );
}
