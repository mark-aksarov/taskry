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
import { useProjectCustomerFiltersModal } from "./ProjectCustomerFiltersModalContext";

interface ProjectCustomerFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCustomerFiltersModal({
  filtersFormContainer,
}: ProjectCustomerFiltersModalProps) {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useProjectCustomerFiltersModal();

  return (
    <FormBaseModal
      data-test="project-customer-filters-modal"
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
  const t = useTranslations("projects.ProjectCustomerFiltersModal");

  const dispatch = useProjectFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setCustomerIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
