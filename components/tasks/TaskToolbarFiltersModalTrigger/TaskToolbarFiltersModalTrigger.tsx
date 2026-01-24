"use client";

import {
  ToolbarFiltersModal,
  ToolbarFiltersModalDialog,
  ToolbarFiltersModalSubmitButton,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";
import { ToolbarFiltersButtonMobile } from "@/components/common/Toolbar/ToolbarFiltersButtonMobile";
import { ToolbarFiltersButtonDesktop } from "@/components/common/Toolbar/ToolbarFiltersButtonDesktop";

export function TaskToolbarFiltersModalTrigger({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const t = useTranslations("tasks.TaskToolbarFiltersModalTrigger");

  return (
    <DialogTrigger>
      <ToolbarFiltersButtonMobile data-test="task-toolbar-filters-button-mobile" />
      <ToolbarFiltersButtonDesktop data-test="task-toolbar-filters-button-desktop" />

      <ToolbarFiltersModal>
        <ToolbarFiltersModalDialog>
          <DialogHeader>title={t("title")}</DialogHeader>
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <ToolbarFiltersModalSubmitButton form="task-filter-form" />
          </DialogFooter>
        </ToolbarFiltersModalDialog>
      </ToolbarFiltersModal>
    </DialogTrigger>
  );
}
