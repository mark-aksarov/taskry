"use client";

import {
  ToolbarSortingMenuTrigger,
  ToolbarSortingButtonMobile,
  ToolbarSortingButtonDesktop,
} from "@/components/common/Toolbar";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { useSelectedProjects } from "./SelectedProjectsContext";
import { ALargeSmall, Blocks, Calendar, CircleCheck } from "lucide-react";

interface ProjectToolbarSortingMenuTriggerProps {
  selectedSortField: string;
}

export function ProjectToolbarSortingMenuTrigger({
  selectedSortField,
}: ProjectToolbarSortingMenuTriggerProps) {
  const t = useTranslations("projects.ProjectToolbarSortingMenuTrigger");
  const { clear: clearSelectedProjects } = useSelectedProjects();

  return (
    <ToolbarSortingMenuTrigger
      clearSelectedItems={clearSelectedProjects}
      selectedKeys={[selectedSortField]}
      renderButton={() => (
        <>
          <ToolbarSortingButtonMobile data-test="project-toolbar-sorting-button-mobile" />
          <ToolbarSortingButtonDesktop data-test="project-toolbar-sorting-button-desktop" />
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
