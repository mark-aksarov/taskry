"use client";

import {
  ProjectFiltersFormProvider,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";
import { useProjectCategoryFiltersModal } from "./ProjectCategoryFiltersModalContext";

interface ProjectCategoryFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCategoryFiltersModal({
  filtersFormContainer,
}: ProjectCategoryFiltersModalProps) {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useProjectCategoryFiltersModal();

  return (
    <FormBaseModal
      data-test="project-category-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ProjectFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
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
