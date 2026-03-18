import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface ProjectCreatorFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCreatorFiltersModal({
  filtersFormContainer,
}: ProjectCreatorFiltersModalProps) {
  const t = useTranslations("projects.ProjectCreatorFiltersModal");

  return (
    <FormBaseModal data-test="project-creator-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
