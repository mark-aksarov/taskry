"use client";

import {
  ToolbarSortingMenuTrigger,
  ToolbarSortingButtonMobile,
  ToolbarSortingButtonDesktop,
} from "@/components/common/Toolbar";

import { Item } from "react-stately";
import { TaskSortField } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useSelectedTasks } from "./SelectedTasksContext";
import { Calendar, CircleCheck, ALargeSmall, Blocks } from "lucide-react";

interface TaskToolbarSortingMenuTriggerProps {
  selectedSortField: TaskSortField;
}

export function TaskToolbarSortingMenuTrigger({
  selectedSortField,
}: TaskToolbarSortingMenuTriggerProps) {
  const t = useTranslations("tasks.TaskToolbarSortingMenuTrigger");
  const { clear: clearSelectedTasks } = useSelectedTasks();

  return (
    <ToolbarSortingMenuTrigger
      clearSelectedItems={clearSelectedTasks}
      selectedKeys={[selectedSortField]}
      renderButton={() => (
        <>
          <ToolbarSortingButtonMobile data-test="task-toolbar-sorting-button-mobile" />
          <ToolbarSortingButtonDesktop data-test="task-toolbar-sorting-button-desktop" />
        </>
      )}
    >
      <Item textValue={t("byCreatedAt")} key="createdAt">
        <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byCreatedAt")}
      </Item>
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
