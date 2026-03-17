import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";

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
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
