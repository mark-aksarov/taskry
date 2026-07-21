"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ProjectSortField } from "@/lib/types";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { ALargeSmall, Calendar, CircleCheck } from "lucide-react";
import { SortingMenuTrigger } from "@/dashboard/common/SortingMenuTrigger";

export interface ProjectSortingMenuTriggerProps {
  selectedSortField: ProjectSortField;
  renderButton: () => React.ReactNode;
}

export function ProjectSortingMenuTrigger({
  selectedSortField,
  renderButton,
}: ProjectSortingMenuTriggerProps) {
  const t = useTranslations("dashboard.projects.ProjectSortingMenuTrigger");
  const { clear: clearSelectedProjects } = useSelectedProjects();

  return (
    <SortingMenuTrigger
      clearSelectedItems={clearSelectedProjects}
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
