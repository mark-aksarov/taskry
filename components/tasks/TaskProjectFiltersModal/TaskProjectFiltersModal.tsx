import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";

interface TaskProjectFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskProjectFiltersModal({
  filtersFormContainer,
}: TaskProjectFiltersModalProps) {
  const t = useTranslations("tasks.TaskProjectFiltersModal");

  return (
    <FormBaseModal data-test="task-project-filters-modal">
      <FilterModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
