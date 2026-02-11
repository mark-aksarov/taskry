"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  useTaskCategorySelection,
  useSyncSelectionTaskCategoryItem,
} from "@/lib/hooks/useTaskCategorySelection";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";

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

  const { isSelected, toggleItem } = useTaskCategorySelection();
  useSyncSelectionTaskCategoryItem(id, name);

  return (
    <ListItem data-test="task-category-list-item">
      <Checkbox
        data-test="task-category-checkbox"
        data-id={id}
        aria-label="task category checkbox"
        isSelected={isSelected(id)}
        onChange={() => toggleItem(id)}
      />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      {menuTrigger}
    </ListItem>
  );
}
