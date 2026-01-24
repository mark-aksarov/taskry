"use client";

import { useTranslations } from "next-intl";
import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/Dialog";
import { Item, useOverlayTriggerState } from "react-stately";
import { Check, ChevronDown, CircleEllipsis, Clock } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export function ProjectDetailStatusMenuTrigger() {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);
  const t = useTranslations("projects.ProjectDetailStatusMenuTrigger");

  return (
    <ResponsiveMenuTrigger
      renderDialogHeader={() => (
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
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
