"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { SelectableItem } from "@/components/common/SelectableItem";
import { TaskCategoryItemCheckbox } from "../TaskCategoryItemCheckbox";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { TaskCategoryListItemPendingOverlay } from "./TaskCategoryListItemPendingOverlay";
import { TaskCategoryListItemActionMenuTrigger } from "./TaskCategoryListItemActionMenuTrigger";

interface TaskCategoryListItemProps {
  id: number;
  name: string;
}

export function TaskCategoryListItem(props: TaskCategoryListItemProps) {
  const selected = useSelectedItems();

  return (
    <TaskCategoryListItemPendingOverlay taskCategoryId={props.id}>
      <SelectableItem {...selected} item={{ id: props.id }}>
        <TaskCategoryListItemInner {...props} />
      </SelectableItem>
    </TaskCategoryListItemPendingOverlay>
  );
}

const TaskCategoryListItemInner = memo(
  ({ id, name }: TaskCategoryListItemProps) => {
    const t = useTranslations("taskCategories.TaskCategoryListItem");

    return (
      <ListItem
        data-test="task-category-list-item"
        className="flex w-full items-center gap-4"
      >
        <TaskCategoryItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <TaskCategoryListItemActionMenuTrigger
          taskCategoryId={id}
          taskCategoryName={name}
        />
      </ListItem>
    );
  },
);
