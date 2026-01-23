"use client";

import { ArrowDownUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Button, DialogHeader, MenuTriggerProps } from "@/components/ui";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export function ToolbarSortingMenuTrigger<T extends object = any>(
  props: MenuTriggerProps<T>,
) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const t = useTranslations("common.Toolbar.ToolbarSortingMenuTrigger");

  return (
    <ResponsiveMenuTrigger
      {...props}
      renderDialogHeader={() => (
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
      )}
      overlayClassName="md:min-w-[150px]"
      renderButton={() => (
        <>
          <Button
            {...triggerProps}
            aria-label={t("ariaLabel")}
            variant="outlined"
            iconLeft={
              <ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="md:hidden"
          />
          <Button
            {...triggerProps}
            data-test="toolbar-sorting-menu-trigger"
            variant="outlined"
            label={t("label")}
            iconLeft={
              <ArrowDownUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            className="max-md:hidden"
          />
        </>
      )}
      placement="bottom left"
    />
  );
}
