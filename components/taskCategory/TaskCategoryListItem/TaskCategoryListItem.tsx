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
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { TaskCategoryListItemPendingOverlay } from "./TaskCategoryListItemPendingOverlay";
import { TaskCategoryListItemActionMenuTrigger } from "./TaskCategoryListItemActionMenuTrigger";
import { DeleteTaskCategoryTransitionProvider } from "../DeleteTaskCategoryTransitionContext";
import { UpdateTaskCategoryTransitionProvider } from "../UpdateTaskCategoryTransitionContext";

interface TaskCategoryListItemProps {
  id: number;
  name: string;
  updateTaskCategory: ActionFn<ActionState, FormData>;
  deleteTaskCategory: ActionFn<ActionState, number[]>;
}

export function TaskCategoryListItem(props: TaskCategoryListItemProps) {
  const selected = useSelectedItems();

  return (
    <UpdateTaskCategoryTransitionProvider>
      <DeleteTaskCategoryTransitionProvider>
        <TaskCategoryListItemPendingOverlay taskCategoryId={props.id}>
          <SelectableItem {...selected} item={{ id: props.id }}>
            <TaskCategoryListItemInner {...props} />
          </SelectableItem>
        </TaskCategoryListItemPendingOverlay>
      </DeleteTaskCategoryTransitionProvider>
    </UpdateTaskCategoryTransitionProvider>
  );
}

const TaskCategoryListItemInner = memo(
  ({
    id,
    name,
    updateTaskCategory,
    deleteTaskCategory,
  }: TaskCategoryListItemProps) => {
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
          updateTaskCategory={updateTaskCategory}
          deleteTaskCategory={deleteTaskCategory}
        />
      </ListItem>
    );
  },
);
