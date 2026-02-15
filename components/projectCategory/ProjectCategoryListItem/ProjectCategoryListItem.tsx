"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { ProjectCategoryItemCheckbox } from "../ProjectCategoryItemCheckbox";

interface ProjectCategoryListItemProps {
  id: number;
  name: string;
  menuTrigger: React.ReactNode;
}

export function ProjectCategoryListItem({
  id,
  name,
  menuTrigger,
}: ProjectCategoryListItemProps) {
  const t = useTranslations("projectCategories.ProjectCategoryListItem");

  return (
    <ListItem data-test="project-category-list-item">
      <ProjectCategoryItemCheckbox id={id} />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      {menuTrigger}
    </ListItem>
  );
}
