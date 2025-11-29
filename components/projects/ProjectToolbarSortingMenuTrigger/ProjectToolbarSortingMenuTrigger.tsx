"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ToolbarSortingMenuTrigger } from "@/components/common/Toolbar";
import { ALargeSmall, Blocks, Calendar, CircleCheck } from "lucide-react";

export function ProjectToolbarSortingMenuTrigger() {
  const t = useTranslations("projects.ProjectToolbarSortingMenuTrigger");

  return (
    <ToolbarSortingMenuTrigger>
      <Item textValue="Title" key="title">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byTitle")}
      </Item>
      <Item textValue="Deadline" key="deadline">
        <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byDeadline")}
      </Item>
      <Item textValue="Status" key="status">
        <CircleCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byStatus")}
      </Item>
      <Item textValue="Category" key="category">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byCategory")}
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
