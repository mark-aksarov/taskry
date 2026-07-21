"use client";

import { Item } from "react-stately";
import { TaskSortField } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useSelectedTasks } from "../SelectedTasksContext";
import { Calendar, CircleCheck, ALargeSmall } from "lucide-react";
import { SortingMenuTrigger } from "@/dashboard/common/SortingMenuTrigger";

export interface TaskSortingMenuTriggerProps {
  selectedSortField: TaskSortField;
  renderButton: () => React.ReactNode;
}

export function TaskSortingMenuTrigger({
  selectedSortField,
  renderButton,
}: TaskSortingMenuTriggerProps) {
  const t = useTranslations("dashboard.tasks.TaskSortingMenuTrigger");
  const { clear: clearSelectedTasks } = useSelectedTasks();

  return (
    <SortingMenuTrigger
      clearSelectedItems={clearSelectedTasks}
      selectedKeys={[selectedSortField]}
      renderButton={renderButton}
    >
      <Item textValue={t("byCreatedAt")} key="createdAt">
        <Calendar    />
        {t("byCreatedAt")}
      </Item>
      <Item textValue={t("byTitle")} key="title">
        <ALargeSmall    />
        {t("byTitle")}
      </Item>
      <Item textValue={t("byDeadline")} key="deadline">
        <Calendar    />
        {t("byDeadline")}
      </Item>
      <Item textValue={t("byStatus")} key="status">
        <CircleCheck    />
        {t("byStatus")}
      </Item>
    </SortingMenuTrigger>
  );
}
