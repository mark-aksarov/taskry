"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SelectableItem } from "@/components/common/SelectableItem";
import { TaskCategoryItemCheckbox } from "../TaskCategoryItemCheckbox";
import { DeleteTaskCategoryProvider } from "../DeleteTaskCategoryContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { TaskCategoryItemDeleteOverlay } from "../TaskCategoryItemDeleteOverlay";
import { TaskCategoryItemActionMenuTrigger } from "../TaskCategoryItemActionMenuTrigger";

interface TaskCategoryListItemProps {
  id: number;
  name: string;
  updateTaskCategory: ActionFn<ActionState, FormData>;
  deleteTaskCategory: ActionFn<ActionState, number[]>;
}

export function TaskCategoryListItem({
  deleteTaskCategory,
  ...props
}: TaskCategoryListItemProps) {
  const selected = useSelectedItems();

  return (
    <DeleteTaskCategoryProvider deleteTaskCategory={deleteTaskCategory}>
      <TaskCategoryItemDeleteOverlay>
        <SelectableItem {...selected} item={{ id: props.id }}>
          <TaskCategoryListItemInner {...props} />
        </SelectableItem>
      </TaskCategoryItemDeleteOverlay>
    </DeleteTaskCategoryProvider>
  );
}

const TaskCategoryListItemInner = memo(
  ({
    id,
    name,
    updateTaskCategory,
  }: Omit<TaskCategoryListItemProps, "deleteTaskCategory">) => {
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

        <TaskCategoryItemActionMenuTrigger
          taskCategoryId={id}
          taskCategoryName={name}
          updateTaskCategory={updateTaskCategory}
        />
      </ListItem>
    );
  },
);
