"use client";

import { useTranslations } from "next-intl";
import { DialogHeader, MenuTriggerProps } from "@/components/ui";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export function ToolbarSortingMenuTrigger<T extends object = any>(
  props: MenuTriggerProps<T>,
) {
  const t = useTranslations("common.ToolbarSortingMenuTrigger");

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => (
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
      )}
      overlayClassName="md:min-w-[150px]"
      placement="bottom left"
      {...props}
    />
  );
}
