"use client";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleButton,
} from "@/components/common/List";

import {
  ItemBaseDeadline,
  ItemBaseDetailButton,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { TaskListItemLayout } from "./TaskListItemLayout";
import { useSelectedTasks } from "../SelectedTasksContext";
import { TaskItemCheckbox } from "../TaskItem/TaskItemCheckbox";
import { useModal } from "@/components/common/ModalManagerContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { BaseTaskItemProps, TaskItemPendingOverlay } from "../TaskItem";
import { TaskItemActionMenuTrigger } from "../TaskItem/TaskItemActionMenuTrigger";

export interface Props extends BaseTaskItemProps {
  category?: {
    id: number;
    name: string;
  };
  project?: {
    id: number;
    title: string;
  };
  showCheckbox?: boolean;
}

export function TaskListItem(props: Props) {
  const selected = useSelectedTasks();

  return (
    <TaskItemPendingOverlay taskId={props.id}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <TaskListItemInner {...props} />
      </SelectableItem>
    </TaskItemPendingOverlay>
  );
}

export const TaskListItemInner = memo(function TaskListItemInner({
  id,
  title,
  deadline,
  assignee,
  category,
  project,
  commentsCount,
  status,
  showCheckbox,
}: Props) {
  const t = useTranslations("tasks.TaskListItem");

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
      id={id}
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
        <TaskItemBaseBadge taskId={id} deadline={deadline} status={status} />
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
