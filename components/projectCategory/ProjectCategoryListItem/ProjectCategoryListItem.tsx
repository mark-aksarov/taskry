"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { ProjectCategoryItemCheckbox } from "../ProjectCategoryItemCheckbox";
import { ProjectCategoryItemActionMenuTrigger } from "../ProjectCategoryItemActionMenuTrigger";

interface ProjectCategoryListItemProps {
  id: number;
  name: string;
  guestMode: boolean;
  updateProjectCategory: ActionFn<ActionState, FormData>;
}

export function ProjectCategoryListItem({
  id,
  name,
  guestMode,
  updateProjectCategory,
}: ProjectCategoryListItemProps) {
  const t = useTranslations("projectCategories.ProjectCategoryListItem");
  const selected = useSelectedItems();

  return (
    <SelectableItem {...selected} item={{ id }}>
      <ListItem
        data-test="project-category-list-item"
        className="flex w-full items-center gap-4"
      >
        <ProjectCategoryItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <ProjectCategoryItemActionMenuTrigger
          guestMode={guestMode}
          projectCategoryId={id}
          projectCategoryName={name}
          updateProjectCategory={updateProjectCategory}
        />
      </ListItem>
    </SelectableItem>
  );
}
