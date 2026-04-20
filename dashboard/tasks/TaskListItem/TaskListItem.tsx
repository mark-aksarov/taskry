"use client";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleButton,
} from "@/dashboard/common/ListItem";

import {
  ItemBaseDeadline,
  ItemBaseDetailButton,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/dashboard/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { TaskItemActionMenuTrigger } from "../TaskItem";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { SelectableTaskItem } from "../SelectableTaskItem";
import { TaskItemStatusBadge } from "../TaskItemStatusBadge";
import { TaskListItemSkeleton } from "./TaskListItemSkeleton";
import { TaskItemCheckbox } from "../TaskItem/TaskItemCheckbox";
import { ListItemGate } from "@/dashboard/common/ListItemGate";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { BaseTaskItemProps, useTaskItemPending } from "../TaskItem";

export interface Props extends BaseTaskItemProps {
  category?: {
    id: number;
    name: string;
  };
  project?: {
    id: number;
    title: string;
  };
  showCheckbox: boolean;
}

export function TaskListItem(props: Props) {
  const isPending = useTaskItemPending(props.id);

  return (
    <ListItemGate
      skeleton={<TaskListItemSkeleton showCheckbox={props.showCheckbox} />}
    >
      <SelectableTaskItem taskId={props.id} taskStatus={props.status}>
        <TaskListItemInner {...props} isPending={isPending} />
      </SelectableTaskItem>
    </ListItemGate>
  );
}

type InnerProps = Props & { isPending: boolean };

export const TaskListItemInner = memo(function TaskListItemInner({
  id,
  isPending,
  title,
  deadline,
  assignee,
  category,
  project,
  commentsCount,
  status,
  showCheckbox,
}: InnerProps) {
  const t = useTranslations("dashboard.tasks.TaskListItem");

  const assigneeImg = (
    <ItemBaseUserImageContainer
      user={assignee}
      className="h-9 w-9"
      width={36}
      height={36}
    />
  );

  const { onOpenChange: onTaskDetailModalOpenChange } = useModal("taskDetail");
  const { onOpenChange: onUserDetailModalOpenChange } = useModal("userDetail");
  const { onOpenChange: onProjectDetailModalOpenChange } =
    useModal("projectDetail");
  const { onOpenChange: onTaskCommentsModalOpenChange } =
    useModal("taskComments");

  return (
    <TaskListItemLayout
      data-id={id}
      className={isPending ? "*:opacity-50" : undefined}
      checkboxSlot={
        showCheckbox ? <TaskItemCheckbox id={id} status={status} /> : undefined
      }
      mainSlot={
        <>
          <ListItemTitleButton
            onPress={() => onTaskDetailModalOpenChange(true)}
          >
            {title}
          </ListItemTitleButton>

          <ListItemText>
            <ItemBaseDeadline deadline={deadline} />
          </ListItemText>
        </>
      }
      assigneeImgSlot={
        <>
          {assignee ? (
            <ItemBaseDetailButton
              aria-label={assignee.fullName}
              onPress={() => onUserDetailModalOpenChange(true)}
            >
              {assigneeImg}
            </ItemBaseDetailButton>
          ) : (
            assigneeImg
          )}
        </>
      }
      assigneeSlot={
        <>
          {assignee ? (
            <ListItemTitleButton
              onPress={() => onUserDetailModalOpenChange(true)}
            >
              {assignee.fullName}
            </ListItemTitleButton>
          ) : (
            <ListItemTitle>{t("noAssignee")}</ListItemTitle>
          )}

          <ListItemText>{t("assignee")}</ListItemText>
        </>
      }
      categorySlot={
        <>
          <ListItemTitle>
            {category ? category.name : t("noCategory")}
          </ListItemTitle>
          <ListItemText>{t("category")}</ListItemText>
        </>
      }
      projectSlot={
        <>
          {project ? (
            <ListItemTitleButton
              onPress={() => onProjectDetailModalOpenChange(true)}
            >
              {project.title}
            </ListItemTitleButton>
          ) : (
            <ListItemTitle>{t("noProject")}</ListItemTitle>
          )}

          <ListItemText>{t("project")}</ListItemText>
        </>
      }
      statusSlot={
        <TaskItemStatusBadge taskId={id} deadline={deadline} status={status} />
      }
      commentsModalTriggerSlot={
        <ItemBaseCommentsButton
          data-test="task-comments-modal-trigger"
          data-id={id.toString()}
          commentsCount={commentsCount}
          onPress={() => onTaskCommentsModalOpenChange(true)}
        />
      }
      menuTriggerSlot={
        <TaskItemActionMenuTrigger taskId={id} taskStatus={status} />
      }
    />
  );
});
