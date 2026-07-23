"use client";

import {
  ProjectFiltersFormProvider,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { useModal } from "@/common/ModalManagerContext";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

interface ProjectClientFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectClientFiltersModal({
  filtersFormContainer,
}: ProjectClientFiltersModalProps) {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useModal("projectClientFilters");

  return (
    <FormBaseModal
      data-test="project-client-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ProjectFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="project-client-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </ProjectFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.projects.ProjectClientFiltersModal");

  const dispatch = useProjectFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setClientIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
