import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface ProjectCategoryFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCategoryFiltersModal({
  filtersFormContainer,
}: ProjectCategoryFiltersModalProps) {
  const t = useTranslations("projects.ProjectCategoryFiltersModal");

  return (
    <FormBaseModal data-test="project-category-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
