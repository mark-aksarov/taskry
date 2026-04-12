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
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface ProjectCreatorFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCreatorFiltersModal({
  filtersFormContainer,
}: ProjectCreatorFiltersModalProps) {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useModal("projectCreatorFilters");

  return (
    <FormBaseModal
      data-test="project-creator-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ProjectFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="project-creator-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </ProjectFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("projects.ProjectCreatorFiltersModal");

  const dispatch = useProjectFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setCreatorIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
