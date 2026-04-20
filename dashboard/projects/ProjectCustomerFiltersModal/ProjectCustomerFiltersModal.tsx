"use client";

import {
  ProjectFiltersFormProvider,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import { useTranslations } from "next-intl";
import { useProjectFilters } from "../ProjectFiltersContext";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { FormBaseModal } from "@/dashboard/common/FormBaseModal";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { FiltersFormSubmitButton } from "@/dashboard/common/FiltersForm";
import { FilterModalDialog } from "@/dashboard/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/dashboard/common/FilterModalDialogHeader";

interface ProjectCustomerFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCustomerFiltersModal({
  filtersFormContainer,
}: ProjectCustomerFiltersModalProps) {
  const initialFilters = useProjectFilters();
  const { isOpen, onOpenChange } = useModal("projectCustomerFilters");

  return (
    <FormBaseModal
      data-test="project-customer-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ProjectFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <FiltersFormSubmitButton form="project-customer-filters-form" />
          </DialogFooter>
        </FilterModalDialog>
      </ProjectFiltersFormProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("dashboard.projects.ProjectCustomerFiltersModal");

  const dispatch = useProjectFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setCustomerIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
