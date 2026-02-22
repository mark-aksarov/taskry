"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { DialogHeader } from "@/components/ui/Dialog";
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

      <FormBaseModal data-test="task-toolbar-filters-modal">
        <FormBaseModalDialog className="md:h-[calc(100dvh-64px)]">
          <DialogHeader>{t("title")}</DialogHeader>
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FormBaseModalDialog>
      </FormBaseModal>
    </DialogTrigger>
  );
}
