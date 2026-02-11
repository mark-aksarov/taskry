"use client";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { MenuTriggerProps } from "@/components/ui/Menu";
import { ToolbarMenuTrigger } from "./ToolbarMenuTrigger";

export function ToolbarManageMenuTrigger<T extends object = any>(
  props: MenuTriggerProps<T>,
) {
  const t = useTranslations("common.ToolbarManageMenuTrigger");

  return (
    <ToolbarMenuTrigger
      renderDialogHeader={() => (
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
      )}
      {...props}
    />
  );
}
