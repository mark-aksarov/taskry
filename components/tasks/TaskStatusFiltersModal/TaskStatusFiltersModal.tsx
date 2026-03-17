import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { TaskStatusFiltersForm } from "../TaskStatusFiltersForm";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";

export function TaskStatusFiltersModal() {
  const t = useTranslations("tasks.TaskStatusFiltersModal");

  return (
    <FormBaseModal data-test="task-status-filters-modal">
      <FilterModalDialog>
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          <TaskStatusFiltersForm />
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
