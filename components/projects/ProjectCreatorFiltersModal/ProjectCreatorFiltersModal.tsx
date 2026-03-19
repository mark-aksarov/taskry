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

interface ProjectCreatorFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCreatorFiltersModal({
  filtersFormContainer,
}: ProjectCreatorFiltersModalProps) {
  const initialFilters = useProjectFilters();

  return (
    <FormBaseModal data-test="project-creator-filters-modal">
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
