"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  ProjectFiltersFormProvider,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm/ProjectFiltersFormContext";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function ProjectFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const initialFilters = useProjectFilters();

  return (
    <FormBaseModal data-test="project-filters-modal">
      {
        // Providers re-mount on each render, so their state is re-initialized
        // using values from ProjectFiltersContext (derived from URL/search params)
      }
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
  const t = useTranslations("projects.ProjectFiltersModal");

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
