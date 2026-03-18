import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useProjectFiltersDispatch } from "../ProjectFiltersContext";
import { ProjectStatusFiltersForm } from "../ProjectStatusFiltersForm";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function ProjectStatusFiltersModal() {
  const t = useTranslations("projects.ProjectStatusFiltersModal");
  const dispatch = useProjectFiltersDispatch();

  return (
    <FormBaseModal data-test="project-status-filters-modal">
      <FilterModalDialog>
        <FilterModalDialogHeader
          resetFilters={() => dispatch({ type: "setStatus", payload: [] })}
        >
          {t("heading")}
        </FilterModalDialogHeader>
        <FormBaseModalDialogBody>
          <ProjectStatusFiltersForm />
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
