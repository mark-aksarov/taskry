"use client";

import {
  ToolbarFiltersModal,
  ToolbarFiltersModalDialog,
  ToolbarFiltersModalTrigger,
  ToolbarFiltersModalSubmitButton,
} from "@/components/common/Toolbar";
import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui";

export function TaskToolbarFiltersModalTrigger({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const t = useTranslations("tasks.TaskToolbarFiltersModalTrigger");

  return (
    <ToolbarFiltersModalTrigger>
      <ToolbarFiltersModal>
        <ToolbarFiltersModalDialog>
          <DialogHeader>title={t("title")}</DialogHeader>
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <ToolbarFiltersModalSubmitButton form="task-filter-form" />
          </DialogFooter>
        </ToolbarFiltersModalDialog>
      </ToolbarFiltersModal>
    </ToolbarFiltersModalTrigger>
  );
}
