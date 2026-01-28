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

export function UserToolbarFiltersModalTrigger({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const t = useTranslations("users.UserToolbarFiltersModalTrigger");

  return (
    <DialogTrigger>
      <ToolbarFiltersButtonMobile data-test="user-toolbar-filters-button-mobile" />
      <ToolbarFiltersButtonDesktop data-test="user-toolbar-filters-button-desktop" />

      <ToolbarFiltersModal data-test="user-toolbar-filters-modal">
        <ToolbarFiltersModalDialog>
          <DialogHeader>{t("title")}</DialogHeader>
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <ToolbarFiltersModalSubmitButton form="user-filter-form" />
          </DialogFooter>
        </ToolbarFiltersModalDialog>
      </ToolbarFiltersModal>
    </DialogTrigger>
  );
}
