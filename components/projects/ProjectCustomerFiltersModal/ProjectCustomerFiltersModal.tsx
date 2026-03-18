import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface ProjectCustomerFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function ProjectCustomerFiltersModal({
  filtersFormContainer,
}: ProjectCustomerFiltersModalProps) {
  const t = useTranslations("projects.ProjectCustomerFiltersModal");

  return (
    <FormBaseModal data-test="project-customer-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
