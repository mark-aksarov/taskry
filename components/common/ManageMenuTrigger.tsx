"use client";

import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "./ResponsiveMenuTrigger";

import { useTranslations } from "next-intl";
import { DialogHeaderWithClose } from "./DialogHeaderWithClose";

export function ManageMenuTrigger(props: ResponsiveMenuTriggerProps) {
  const t = useTranslations("common.ManageMenuTrigger");

  return (
    <ResponsiveMenuTrigger
      overlayClassName="md:min-w-[150px]"
      placement="bottom left"
      renderDialogHeader={() => (
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
      )}
      {...props}
    />
  );
}
