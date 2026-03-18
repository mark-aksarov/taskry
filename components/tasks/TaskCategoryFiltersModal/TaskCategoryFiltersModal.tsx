import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface TaskCategoryFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskCategoryFiltersModal({
  filtersFormContainer,
}: TaskCategoryFiltersModalProps) {
  const t = useTranslations("tasks.TaskCategoryFiltersModal");

  return (
    <FormBaseModal data-test="task-category-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
