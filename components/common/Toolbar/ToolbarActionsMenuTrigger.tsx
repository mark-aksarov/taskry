"use client";

import {
  Button,
  DialogHeader,
  DialogHeading,
  MenuTriggerProps,
  DialogCloseButton,
} from "@/components/ui";

import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { ResponsiveMenuTrigger } from "../ResponsiveMenuTrigger";

export type ToolbarActionsMenuTriggerProps<T extends object = any> = {
  isDisabled?: boolean;
} & MenuTriggerProps<T>;

export function ToolbarActionsMenuTrigger<T extends object = any>({
  isDisabled,
  ...props
}: ToolbarActionsMenuTriggerProps<T>) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const t = useTranslations("common.Toolbar.ToolbarActionsMenuTrigger");

  return (
    <ResponsiveMenuTrigger
      {...props}
      renderDialogHeader={() => (
        <DialogHeader>
          <DialogHeading>{t("heading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      renderButton={() => (
        <>
          <Button
            {...triggerProps}
            aria-label={t("ariaLabel")}
            variant="outlined"
            iconLeft={
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            isDisabled={isDisabled}
            className="md:hidden"
          />
          <Button
            {...triggerProps}
            data-test="toolbar-action-menu-trigger"
            variant="outlined"
            label={t("label")}
            iconLeft={
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
            isDisabled={isDisabled}
            className="max-md:hidden"
          />
        </>
      )}
      placement="bottom left"
    />
  );
}
