"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { TaskCategoryItemCheckbox } from "../TaskCategoryItemCheckbox";

interface TaskCategoryListItemProps {
  id: number;
  name: string;
  menuTrigger: React.ReactNode;
}

export function TaskCategoryListItem({
  id,
  name,
  menuTrigger,
}: TaskCategoryListItemProps) {
  const t = useTranslations("taskCategories.TaskCategoryListItem");

  return (
    <ListItem data-test="task-category-list-item">
      <TaskCategoryItemCheckbox id={id} />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      {menuTrigger}
    </ListItem>
  );
}
