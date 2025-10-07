"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";

import { Button, Checkbox } from "@/components/ui";

import {
  ItemCard,
  ItemCardActionMenuDialogHeader,
  itemCardActionMenuItemStyles,
  ItemCardActionMenuSkeleton,
  ItemCardField,
  ItemCardFieldSkeleton,
  ItemCardFieldText,
  ItemCardFieldTitle,
  ItemCardImageField,
  ItemCardImageFieldSkeleton,
  ItemCardProgress,
  ItemCardProgressSkeleton,
  ItemCardBadge,
  ItemCardBadgeSkeleton,
  ItemCardFieldLink,
  ItemCardFieldBox,
} from "@/components/common/ItemCard";

import {
  ACTIVE_TASK_STATUS_ID,
  PENDING_TASK_STATUS_ID,
} from "@/lib/queries/constants";
import { TaskPreview } from "@/lib/queries/types";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { Link } from "@/components/ui";

export const TaskItem = ({
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
    <ItemCard>
      {task && showCheckbox && <Checkbox aria-label="task checkbox" />}

      {/* --- Task Details --- */}
      {!task ? (
        <ItemCardFieldSkeleton />
      ) : (
        <ItemCardField>
          <ItemCardFieldBox>
            <ItemCardFieldTitle>
              <ItemCardFieldLink href={`/tasks/${task.id}`}>
                {task.title}
              </ItemCardFieldLink>
            </ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>{`Deadline on ${formattedDeadline}`}</ItemCardFieldText>
          </ItemCardFieldBox>
        </ItemCardField>
      )}

      {/* --- Category --- */}
      {!task ? (
        <ItemCardFieldSkeleton className="@max-3xl:hidden" />
      ) : (
        <ItemCardField className="@max-3xl:hidden">
          <ItemCardFieldBox>
            <ItemCardFieldTitle>Category</ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>
              <ItemCardFieldLink href={`/categories/${task.category.id}`}>
                {task.category.name}
              </ItemCardFieldLink>
            </ItemCardFieldText>
          </ItemCardFieldBox>
        </ItemCardField>
      )}

      {/* --- Project --- */}
      {!task ? (
        <ItemCardFieldSkeleton className="@max-5xl:hidden" />
      ) : (
        <ItemCardField className="@max-5xl:hidden">
          <ItemCardFieldBox>
            <ItemCardFieldTitle>Project</ItemCardFieldTitle>
          </ItemCardFieldBox>

          <ItemCardFieldBox>
            <ItemCardFieldText>
              <ItemCardFieldLink href={`/projects/${task.project.id}`}>
                {task.project.title}
              </ItemCardFieldLink>
            </ItemCardFieldText>
          </ItemCardFieldBox>
        </ItemCardField>
      )}

      {/* --- Right side (progress, status, creator, menu) --- */}
      <div className="flex flex-none items-center justify-end gap-4">
        {/* --- Progress --- */}
        {!task ? (
          <ItemCardProgressSkeleton />
        ) : (
          <ItemCardProgress
            value={progressValue}
            showValueText={false}
            aria-label="task progress"
          />
        )}

        {/* --- Status Badge --- */}
        {!task ? (
          <ItemCardBadgeSkeleton />
        ) : (
          <ItemCardBadge
            color={
              task.statusId === PENDING_TASK_STATUS_ID
                ? "orange"
                : task.statusId === ACTIVE_TASK_STATUS_ID
                  ? "green"
                  : "blue"
            }
          >
            {task.status.nameEn}
          </ItemCardBadge>
        )}

        {/* --- Creator Image & Menu --- */}
        <div className="flex items-center gap-2">
          {!task ? (
            <ItemCardImageFieldSkeleton />
          ) : task.creator?.imageUrl ? (
            <Link href={`/users/${task.creator.id}`}>
              <ItemCardImageField>
                <Image
                  fill
                  src={task.creator.imageUrl}
                  alt={task.creator.name}
                />
              </ItemCardImageField>
            </Link>
          ) : (
            <ItemCardImageField />
          )}

          {!task ? (
            <ItemCardActionMenuSkeleton />
          ) : (
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <ItemCardActionMenuDialogHeader />}
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
                <div className={itemCardActionMenuItemStyles}>
                  <Trash size={16} /> Delete
                </div>
              </Item>
              <Item textValue="Mark as Pending" key="pending">
                <div className={itemCardActionMenuItemStyles}>
                  <CircleEllipsis size={16} /> Mark as Pending
                </div>
              </Item>
              <Item textValue="Mark as Done" key="done">
                <div className={itemCardActionMenuItemStyles}>
                  <Check size={16} />
                  Mark as Done
                </div>
              </Item>
              <Item textValue="Mark as Active" key="active">
                <div className={itemCardActionMenuItemStyles}>
                  <Clock size={16} />
                  Mark as Active
                </div>
              </Item>
            </ResponsiveMenuTrigger>
          )}
        </div>
      </div>
    </ItemCard>
  );
};
