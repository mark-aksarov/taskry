"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";

import { Button, Checkbox } from "@/components/ui";

import {
  ListItem,
  ListItemActionMenuDialogHeader,
  listItemActionMenuItemStyles,
  ListItemActionMenuSkeleton,
  ListItemInfo,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
  ListItemImageContainer,
  ListItemImageContainerSkeleton,
  ListItemProgress,
  ListItemProgressSkeleton,
  ListItemBadge,
  ListItemBadgeSkeleton,
  ListItemLink,
  ListItemEllipsisWrapper,
} from "@/components/common/List";

import {
  ACTIVE_TASK_STATUS_ID,
  PENDING_TASK_STATUS_ID,
} from "@/lib/queries/constants";
import { TaskPreview } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { Link } from "@/components/ui";

export const TaskListItem = ({
  task,
  showCheckbox,
}: {
  task?: TaskPreview;
  showCheckbox?: boolean;
}) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!task?.deadline) return "";
    return new Date(task.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [task?.deadline, locale]);

  const progressValue = useMemo(() => {
    if (!task || task.subtasks.length === 0) return 0;
    const subtasksDone = task.subtasks.filter((s) => s.isDone).length;
    return (subtasksDone / task.subtasks.length) * 100;
  }, [task]);

  return (
    <ListItem>
      {task && showCheckbox && <Checkbox aria-label="task checkbox" />}

      {/* --- Task Details --- */}
      {!task ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemEllipsisWrapper>
            <ListItemTitle>
              <ListItemLink href={`/tasks/${task.id}`}>
                {task.title}
              </ListItemLink>
            </ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
          </ListItemEllipsisWrapper>
        </ListItemInfo>
      )}

      {/* --- Category --- */}
      {!task ? (
        <ListItemInfoSkeleton className="@max-3xl:hidden" />
      ) : (
        <ListItemInfo className="@max-3xl:hidden">
          <ListItemEllipsisWrapper>
            <ListItemTitle>Category</ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>
              <ListItemLink href={`/categories/${task.category.id}`}>
                {task.category.name}
              </ListItemLink>
            </ListItemText>
          </ListItemEllipsisWrapper>
        </ListItemInfo>
      )}

      {/* --- Project --- */}
      {!task ? (
        <ListItemInfoSkeleton className="@max-5xl:hidden" />
      ) : (
        <ListItemInfo className="@max-5xl:hidden">
          <ListItemEllipsisWrapper>
            <ListItemTitle>Project</ListItemTitle>
          </ListItemEllipsisWrapper>

          <ListItemEllipsisWrapper>
            <ListItemText>
              <ListItemLink href={`/projects/${task.project.id}`}>
                {task.project.title}
              </ListItemLink>
            </ListItemText>
          </ListItemEllipsisWrapper>
        </ListItemInfo>
      )}

      {/* --- Right side (progress, status, creator, menu) --- */}
      <div className="flex flex-none items-center justify-end gap-4">
        {/* --- Progress --- */}
        {!task ? (
          <ListItemProgressSkeleton />
        ) : (
          <ListItemProgress
            value={progressValue}
            showValueText={false}
            aria-label="task progress"
          />
        )}

        {/* --- Status Badge --- */}
        {!task ? (
          <ListItemBadgeSkeleton />
        ) : (
          <ListItemBadge
            color={
              task.statusId === PENDING_TASK_STATUS_ID
                ? "orange"
                : task.statusId === ACTIVE_TASK_STATUS_ID
                  ? "green"
                  : "blue"
            }
          >
            {task.status.nameEn}
          </ListItemBadge>
        )}

        {/* --- Creator Image & Menu --- */}
        <div className="flex items-center gap-2">
          {!task ? (
            <ListItemImageContainerSkeleton />
          ) : task.creator?.imageUrl ? (
            <Link href={`/users/${task.creator.id}`}>
              <ListItemImageContainer>
                <Image
                  fill
                  src={task.creator.imageUrl}
                  alt={task.creator.name}
                />
              </ListItemImageContainer>
            </Link>
          ) : (
            <ListItemImageContainer />
          )}

          {!task ? (
            <ListItemActionMenuSkeleton />
          ) : (
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <ListItemActionMenuDialogHeader />}
              renderButton={() => (
                <Button
                  aria-label="task menu"
                  variant="ghost"
                  iconLeft={
                    <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  }
                  className="rounded-full"
                />
              )}
            >
              <Item textValue="Delete" key="delete">
                <div className={listItemActionMenuItemStyles}>
                  <Trash size={16} /> Delete
                </div>
              </Item>
              <Item textValue="Mark as Pending" key="pending">
                <div className={listItemActionMenuItemStyles}>
                  <CircleEllipsis size={16} /> Mark as Pending
                </div>
              </Item>
              <Item textValue="Mark as Done" key="done">
                <div className={listItemActionMenuItemStyles}>
                  <Check size={16} />
                  Mark as Done
                </div>
              </Item>
              <Item textValue="Mark as Active" key="active">
                <div className={listItemActionMenuItemStyles}>
                  <Clock size={16} />
                  Mark as Active
                </div>
              </Item>
            </ResponsiveMenuTrigger>
          )}
        </div>
      </div>
    </ListItem>
  );
};
