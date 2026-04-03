"use client";

import { Item } from "react-stately";
import { TaskSortField } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useSelectedTasks } from "../SelectedTasksContext";
import { Calendar, CircleCheck, ALargeSmall, Blocks } from "lucide-react";
import { SortingMenuTrigger } from "@/components/common/SortingMenuTrigger";

export interface TaskSortingMenuTriggerProps {
  selectedSortField: TaskSortField;
  renderButton: () => React.ReactNode;
}

export function TaskSortingMenuTrigger({
  selectedSortField,
  renderButton,
}: TaskSortingMenuTriggerProps) {
  const t = useTranslations("tasks.TaskSortingMenuTrigger");
  const { clear: clearSelectedTasks } = useSelectedTasks();

  return (
    <SortingMenuTrigger
      clearSelectedItems={clearSelectedTasks}
      selectedKeys={[selectedSortField]}
      renderButton={renderButton}
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
    </SortingMenuTrigger>
  );
}
