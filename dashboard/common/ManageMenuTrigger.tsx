"use client";

import {
  ResponsiveMenuTrigger,
  ResponsiveMenuTriggerProps,
} from "@/common/ResponsiveMenuTrigger";

import { useTranslations } from "next-intl";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

export function ManageMenuTrigger(props: ResponsiveMenuTriggerProps) {
  const t = useTranslations("dashboard.common.ManageMenuTrigger");

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
