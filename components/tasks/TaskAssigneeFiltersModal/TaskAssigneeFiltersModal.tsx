import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface TaskAssigneeFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskAssigneeFiltersModal({
  filtersFormContainer,
}: TaskAssigneeFiltersModalProps) {
  const t = useTranslations("tasks.TaskAssigneeFiltersModal");

  return (
    <FormBaseModal data-test="task-assignee-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
