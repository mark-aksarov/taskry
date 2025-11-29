"use client";

import { Item } from "react-stately";
import { ToolbarSortingMenuTrigger } from "@/components/common/Toolbar";
import { Calendar, CircleCheck, ALargeSmall, Blocks } from "lucide-react";
import { useTranslations } from "next-intl";

export function TaskToolbarSortingMenuTrigger() {
  const t = useTranslations("tasks.TaskToolbarSortingMenuTrigger");

  return (
    <ToolbarSortingMenuTrigger>
      <Item textValue={t("byTitle")} key="title">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byTitle")}
      </Item>
      <Item textValue={t("byDeadline")} key="deadline">
        <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byDeadline")}
      </Item>
      <Item textValue={t("byStatus")} key="status">
        <CircleCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byStatus")}
      </Item>
      <Item textValue={t("byCategory")} key="category">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byCategory")}
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
