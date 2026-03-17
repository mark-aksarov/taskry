"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { DialogHeader } from "@/components/ui/Dialog";
import { ToolbarFiltersButtonMobile } from "@/components/common/ToolbarOld/ToolbarFiltersButtonMobile";
import { ToolbarFiltersButtonDesktop } from "@/components/common/ToolbarOld/ToolbarFiltersButtonDesktop";

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

      <FormBaseModal data-test="user-toolbar-filters-modal">
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
