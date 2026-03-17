"use client";

import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "./ResponsiveMenuTrigger";
import { DialogHeader } from "../ui/Dialog";
import { useTranslations } from "next-intl";

export function ManageMenuTrigger(props: ResponsiveMenuTriggerProps) {
  const t = useTranslations("common.ManageMenuTrigger");

  return (
    <ResponsiveMenuTrigger
      overlayClassName="md:min-w-[150px]"
      placement="bottom left"
      renderDialogHeader={() => (
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
      )}
      {...props}
    />
  );
}
