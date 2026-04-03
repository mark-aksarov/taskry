"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ProjectSortField } from "@/lib/types";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { ALargeSmall, Calendar, CircleCheck } from "lucide-react";
import { SortingMenuTrigger } from "@/components/common/SortingMenuTrigger";

export interface ProjectSortingMenuTriggerProps {
  selectedSortField: ProjectSortField;
  renderButton: () => React.ReactNode;
}

export function ProjectSortingMenuTrigger({
  selectedSortField,
  renderButton,
}: ProjectSortingMenuTriggerProps) {
  const t = useTranslations("projects.ProjectSortingMenuTrigger");
  const { clear: clearSelectedProjects } = useSelectedProjects();

  return (
    <SortingMenuTrigger
      clearSelectedItems={clearSelectedProjects}
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
