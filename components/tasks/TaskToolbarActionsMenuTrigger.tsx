"use client";

import { Item } from "react-stately";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useTranslations } from "next-intl";

export const TaskToolbarActionsMenuTrigger = () => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");

  return (
    <ToolbarActionsMenuTrigger>
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("delete")}
      </Item>
      <Item textValue={t("pending")} key="pending">
        <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("pending")}
      </Item>
      <Item textValue={t("active")} key="active">
        <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("active")}
      </Item>
      <Item textValue={t("completed")} key="done">
        <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("completed")}
      </Item>
    </ToolbarActionsMenuTrigger>
  );
};
