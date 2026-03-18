"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface TaskFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskFiltersModal({
  filtersFormContainer,
}: TaskFiltersModalProps) {
  const t = useTranslations("tasks.TaskFiltersModal");

  return (
    <FormBaseModal data-test="task-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
