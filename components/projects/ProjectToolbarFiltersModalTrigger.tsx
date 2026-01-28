"use client";

import {
  ToolbarFiltersModal,
  ToolbarFiltersModalDialog,
  ToolbarFiltersModalSubmitButton,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { DialogBody, DialogFooter, DialogHeader } from "../ui/Dialog";
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

      <ToolbarFiltersModal data-test="project-toolbar-filters-modal">
        <ToolbarFiltersModalDialog>
          <DialogHeader>{t("title")}</DialogHeader>
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <ToolbarFiltersModalSubmitButton form="project-filter-form" />
          </DialogFooter>
        </ToolbarFiltersModalDialog>
      </ToolbarFiltersModal>
    </DialogTrigger>
  );
}
