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
import { useProjectCreatorFiltersModal } from "./ProjectCreatorFiltersModalContext";

interface ProjectCreatorFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCreatorFiltersModal({
  filtersFormContainer,
}: ProjectCreatorFiltersModalProps) {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useProjectCreatorFiltersModal();

  return (
    <FormBaseModal
      data-test="project-creator-filters-modal"
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
