"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import {
  useProjectCategorySelection,
  useSyncSelectionProjectCategoryItem,
} from "@/lib/hooks/useProjectCategorySelection";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";

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

  const { isSelected, toggleItem } = useProjectCategorySelection();
  useSyncSelectionProjectCategoryItem(id, name);

  return (
    <ListItem data-test="project-category-list-item">
      <Checkbox
        data-test="project-category-checkbox"
        data-id={id}
        aria-label="project category checkbox"
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
