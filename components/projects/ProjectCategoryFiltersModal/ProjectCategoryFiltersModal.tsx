"use client";

import {
  ProjectFiltersFormProvider,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface ProjectCategoryFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCategoryFiltersModal({
  filtersFormContainer,
}: ProjectCategoryFiltersModalProps) {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useModal("projectCategoryFilters");

  return (
    <FormBaseModal
      data-test="project-category-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ProjectFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="project-category-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </ProjectFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("projects.ProjectCategoryFiltersModal");

  const dispatch = useProjectFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setCategoryIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
