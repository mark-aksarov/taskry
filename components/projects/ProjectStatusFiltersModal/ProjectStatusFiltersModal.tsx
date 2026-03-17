import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { ProjectStatusFiltersForm } from "../ProjectStatusFiltersForm";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";

export function ProjectStatusFiltersModal() {
  const t = useTranslations("projects.ProjectStatusFiltersModal");

  return (
    <FormBaseModal data-test="project-status-filters-modal">
      <FilterModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          <ProjectStatusFiltersForm />
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
