"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "../common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { DialogTrigger } from "react-aria-components";
import { ToolbarFiltersButtonMobile } from "../common/Toolbar/ToolbarFiltersButtonMobile";
import { ToolbarFiltersButtonDesktop } from "../common/Toolbar/ToolbarFiltersButtonDesktop";

export function ProjectToolbarFiltersModalTrigger({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const t = useTranslations("projects.ProjectToolbarFiltersModalTrigger");

  return (
    <DialogTrigger>
      <ToolbarFiltersButtonMobile data-test="project-toolbar-filters-button-mobile" />
      <ToolbarFiltersButtonDesktop data-test="project-toolbar-filters-button-desktop" />

      <FormBaseModal data-test="project-toolbar-filters-modal">
        <FormBaseModalDialog>
          <DialogHeader>{t("title")}</DialogHeader>
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FormBaseModalDialog>
      </FormBaseModal>
    </DialogTrigger>
  );
}
