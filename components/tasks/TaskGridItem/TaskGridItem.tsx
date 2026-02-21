"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemProgress,
} from "@/components/common/Grid";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { SelectableItem } from "../../common/SelectableItem";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskItemCheckbox } from "../TaskItemCheckbox";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { useFormatter, useTranslations } from "next-intl";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { useSelectedTasks } from "../SelectedTasksContext";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";

export interface TaskGridItemProps {
  id: number;
  title: string;
  deadline: string;
  assignee?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
  commentsCount: number;
  status: TaskStatus;
  subtasksTotal: number;
  subtasksDone: number;
  taskCommentsModal: React.ReactNode;
  menuTrigger: React.ReactNode;
  taskDetailModal: React.ReactNode;
  userDetailModal: React.ReactNode;
  updateTaskStatus: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export const TaskGridItem = ({
  updateTaskStatus,
  ...props
}: TaskGridItemProps) => {
  const selected = useSelectedTasks();

  return (
    <UpdateTaskStatusProvider updateStatus={updateTaskStatus}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <TaskGridItemInner {...props} />
      </SelectableItem>
    </UpdateTaskStatusProvider>
  );
};

export function TaskGridItemInner({
  id,
  title,
  deadline,
  assignee,
  commentsCount,
  status,
  subtasksTotal,
  subtasksDone,
  taskCommentsModal,
  menuTrigger,
  taskDetailModal,
  userDetailModal,
}: Omit<TaskGridItemProps, "updateTaskStatus">) {
  const t = useTranslations("tasks.TaskGridItem");

  // use useFormatter to format the date according to the user's locale
  const format = useFormatter();

  const deadlineOn = t("deadlineOn", {
    date: format.dateTime(new Date(deadline), {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  });

  const assigneeImg = assignee?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={assignee.imageUrl} alt={assignee.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <TaskGridItemLayout
      checkboxSlot={<TaskItemCheckbox id={id} status={status} />}
      menuTriggerSlot={menuTrigger}
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={taskDetailModal}
              className="truncate max-md:hidden"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <Link className="block truncate md:hidden" href={`/tasks/${id}`}>
              {title}
            </Link>
          </GridItemTitle>

          <GridItemText>{deadlineOn}</GridItemText>
        </GridItemInfo>
      }
      assigneeImageSlot={
        assignee ? (
          <>
            <ItemBaseDetailModalTrigger
              modal={userDetailModal}
              className="max-md:hidden"
            >
              {assigneeImg}
            </ItemBaseDetailModalTrigger>

            <Link className="md:hidden" href={`/team/${assignee.id}`}>
              {assigneeImg}
            </Link>
          </>
        ) : (
          <UnknownUser className="h-9 w-9" />
        )
      }
      commentsSlot={
        <ItemBaseCommentsModalTrigger
          data-test={`task-${id}-comments-modal-trigger`}
          commentsCount={commentsCount}
          modal={taskCommentsModal}
        />
      }
      statusSlot={<TaskItemBaseBadge taskId={id} status={status} />}
      progressSlot={
        <GridItemProgress
          value={(subtasksDone / subtasksTotal) * 100}
          showValueText={false}
          aria-label={t("progressAriaLabel")}
        />
      }
    />
  );
}
