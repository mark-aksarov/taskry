"use client";

import {
  GridItemInfo,
  GridItemText,
  GridItemTitle,
  GridItemProgress,
  GridItemTitleDetailModalTrigger,
} from "@/components/common/Grid";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import { memo } from "react";
import Image from "next/image";
import { TaskItemProps } from "../TaskItem";
import { Link } from "@/components/ui/Link";
import { EditTaskModal } from "../EditTaskModal";
import { TaskDetailModal } from "../TaskDetailModal";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { TaskItemBaseBadge } from "../TaskItemBaseBadge";
import { useFormatter, useTranslations } from "next-intl";
import { TaskGridItemLayout } from "./TaskGridItemLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { TaskItemCheckbox } from "../TaskItem/TaskItemCheckbox";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { TaskItemActionMenuTrigger } from "../TaskItem/TaskItemActionMenuTrigger";

export type TaskGridItemProps = Omit<
  TaskItemProps,
  | "category"
  | "project"
  | "showCheckbox"
  | "projectDetailContainer"
  | "updateTask"
  | "deleteTask"
  | "updateTaskStatus"
>;

export const TaskGridItem = memo(
  ({
    id,
    title,
    deadline,
    assignee,
    commentsCount,
    status,
    subtasksTotal,
    subtasksDone,
    taskCommentsContainer,
    editTaskFormContainer,
    taskDetailContainer,
    userDetailContainer,
    userDetailHeaderContainer,
    sendComment,
    updateComment,
  }: TaskGridItemProps) => {
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
        <Image
          src={assignee.imageUrl}
          alt={assignee.fullName}
          width={36}
          height={36}
        />
      </ImageContainer>
    ) : (
      <UnknownUser className="h-9 w-9" />
    );

    return (
      <>
        <TaskGridItemLayout
          checkboxSlot={<TaskItemCheckbox id={id} status={status} />}
          menuTriggerSlot={
            <TaskItemActionMenuTrigger
              taskId={id}
              taskTitle={title}
              taskStatus={status}
              className="-mr-2"
            />
          }
          titleSlot={
            <>
              {/* Show modal on desktop */}
              <GridItemInfo className="flex-auto max-md:hidden">
                <GridItemTitleDetailModalTrigger
                  modal={
                    <TaskDetailModal
                      taskId={id}
                      taskDetailContainer={taskDetailContainer}
                    />
                  }
                >
                  {title}
                </GridItemTitleDetailModalTrigger>

                <GridItemText>{deadlineOn}</GridItemText>
              </GridItemInfo>

              {/* Show only text on mobile */}
              <GridItemInfo className="flex-auto md:hidden">
                <GridItemTitle>{title}</GridItemTitle>
                <GridItemText>{deadlineOn}</GridItemText>
              </GridItemInfo>
            </>
          }
          assigneeImageSlot={
            assignee ? (
              <>
                {/* Show modal on desktop */}
                <ItemBaseDetailModalTrigger
                  modal={
                    <UserDetailModal
                      userId={assignee.id}
                      userDetailHeaderContainer={userDetailHeaderContainer}
                      userDetailContainer={userDetailContainer}
                    />
                  }
                  className="max-md:hidden"
                >
                  {assigneeImg}
                </ItemBaseDetailModalTrigger>

                {/* Show link on mobile */}
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
              modal={
                <TaskCommentsModal
                  taskId={id}
                  taskCommentsContainer={taskCommentsContainer}
                  sendComment={sendComment}
                  updateComment={updateComment}
                />
              }
            />
          }
          statusSlot={
            <TaskItemBaseBadge
              taskId={id}
              deadline={deadline}
              status={status}
            />
          }
          progressSlot={
            <GridItemProgress
              value={(subtasksDone / subtasksTotal) * 100}
              showValueText={false}
              aria-label={t("progressAriaLabel")}
            />
          }
        />

        {/* Modal for editing task details */}
        <EditTaskModal editTaskFormContainer={editTaskFormContainer} />
      </>
    );
  },
);
