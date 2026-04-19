"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/ListItem";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { TaskCategoryItemCheckbox } from "../TaskCategoryItemCheckbox";
import { SelectableTaskCategoryItem } from "../SelectableTaskCategoryItem";
import { useTaskCategoryListItemPending } from "./useTaskCategoryListItemPending";
import { TaskCategoryListItemActionMenuTrigger } from "./TaskCategoryListItemActionMenuTrigger";

interface TaskCategoryListItemProps {
  id: number;
  name: string;
}

export function TaskCategoryListItem(props: TaskCategoryListItemProps) {
  const isPending = useTaskCategoryListItemPending(props.id);

  return (
    <SelectableTaskCategoryItem taskCategoryId={props.id}>
      <TaskCategoryListItemInner {...props} isPending={isPending} />
    </SelectableTaskCategoryItem>
  );
}

type InnerProps = TaskCategoryListItemProps & {
  isPending: boolean;
};

const TaskCategoryListItemInner = memo(function TaskCategoryListItemInner({
  id,
  name,
  isPending,
}: InnerProps) {
  const t = useTranslations("taskCategories.TaskCategoryListItem");

  return (
    <ListItem
      data-test="task-category-list-item"
      className={twMerge(
        "flex w-full items-center gap-4",
        isPending && "*:opacity-50",
      )}
    >
      <TaskCategoryItemCheckbox id={id} />
      <ListItemInfo>
        <ListItemTitle>{name}</ListItemTitle>
        <ListItemText>{t("name")}</ListItemText>
      </ListItemInfo>

      <TaskCategoryListItemActionMenuTrigger taskCategoryId={id} />
    </ListItem>
  );
});
