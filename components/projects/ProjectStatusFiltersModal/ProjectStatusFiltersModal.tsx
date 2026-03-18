import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ProjectStatusFiltersForm } from "../ProjectStatusFiltersForm";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function ProjectStatusFiltersModal() {
  const t = useTranslations("projects.ProjectStatusFiltersModal");

  return (
    <FormBaseModal data-test="project-status-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <ProjectStatusFiltersForm />
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
