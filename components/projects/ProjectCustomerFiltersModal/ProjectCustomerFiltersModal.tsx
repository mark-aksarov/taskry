import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useProjectFiltersDispatch } from "../ProjectFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface ProjectCustomerFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCustomerFiltersModal({
  filtersFormContainer,
}: ProjectCustomerFiltersModalProps) {
  const t = useTranslations("projects.ProjectCustomerFiltersModal");
  const dispatch = useProjectFiltersDispatch();

  return (
    <FormBaseModal data-test="project-customer-filters-modal">
      <FilterModalDialog>
        <FilterModalDialogHeader
          resetFilters={() => dispatch({ type: "setCustomer", payload: [] })}
        >
          {t("heading")}
        </FilterModalDialogHeader>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
