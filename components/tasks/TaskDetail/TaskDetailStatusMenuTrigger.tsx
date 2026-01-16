"use client";

import {
  Button,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { Item, useOverlayTriggerState } from "react-stately";
import { Check, ChevronDown, CircleEllipsis, Clock } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { useTranslations } from "next-intl";

export function TaskDetailStatusMenuTrigger() {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const t = useTranslations("tasks.TaskDetail.TaskDetailStatusMenuTrigger");

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => (
        <DialogHeader>
          <DialogHeading>{t("dialogHeading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      renderButton={() => (
        <Button
          {...triggerProps}
          variant="outlined"
          label={t("items.active")}
          className="rounded-lg"
          iconRight={
            <ChevronDown size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
      )}
      placement="bottom left"
    >
      <Item textValue={t("items.active")} key="active">
        <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("items.active")}
      </Item>
      <Item textValue={t("items.pending")} key="pending">
        <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("items.pending")}
      </Item>
      <Item textValue={t("items.completed")} key="done">
        <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("items.completed")}
      </Item>
    </ResponsiveMenuTrigger>
  );
}
