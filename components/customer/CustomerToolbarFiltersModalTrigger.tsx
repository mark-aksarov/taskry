"use client";

import {
  ToolbarFiltersButtonMobile,
  ToolbarFiltersButtonDesktop,
} from "@/components/common/ToolbarOld";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { DialogHeader } from "@/components/ui/Dialog";

export function CustomerToolbarFiltersModalTrigger({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const t = useTranslations("customers.CustomerToolbarFiltersModalTrigger");

  return (
    <DialogTrigger>
      <ToolbarFiltersButtonMobile data-test="customer-toolbar-filters-button-mobile" />
      <ToolbarFiltersButtonDesktop data-test="customer-toolbar-filters-button-desktop" />

      <FormBaseModal data-test="customer-toolbar-filters-modal">
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
