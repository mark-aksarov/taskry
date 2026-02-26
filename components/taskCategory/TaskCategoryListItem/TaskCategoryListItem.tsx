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
import { TaskCategoryItemCheckbox } from "../TaskCategoryItemCheckbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { TaskCategoryItemActionMenuTrigger } from "../TaskCategoryItemActionMenuTrigger";

interface TaskCategoryListItemProps {
  id: number;
  name: string;
  guestMode: boolean;
  updateTaskCategory: ActionFn<ActionState, FormData>;
}

export function TaskCategoryListItem({
  id,
  name,
  guestMode,
  updateTaskCategory,
}: TaskCategoryListItemProps) {
  const t = useTranslations("taskCategories.TaskCategoryListItem");
  const selected = useSelectedItems();

  return (
    <SelectableItem {...selected} item={{ id }}>
      <ListItem
        data-test="task-category-list-item"
        className="flex w-full items-center gap-4"
      >
        <TaskCategoryItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <TaskCategoryItemActionMenuTrigger
          guestMode={guestMode}
          taskCategoryId={id}
          taskCategoryName={name}
          updateTaskCategory={updateTaskCategory}
        />
      </ListItem>
    </SelectableItem>
  );
}
