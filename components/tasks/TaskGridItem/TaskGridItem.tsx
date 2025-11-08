"use client";

import {
  GridItem,
  GridItemInfo,
  GridItemProgress,
  GridItemText,
  GridItemTitle,
  GridItemTop,
  GridItemInfoSkeleton,
  GridItemProgressSkeleton,
} from "@/components/common/Grid";

import { Item } from "react-stately";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

import { useMemo } from "react";
import {
  Button,
  Link,
  Checkbox,
  RACButton,
  focusRing,
  RACDialogTrigger,
} from "@/components/ui";
import Image from "next/image";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { TaskDetailModal } from "../TaskDetailModal";

export interface TaskGridItemType {
  id: number;
  title: string;
  deadline?: Date | null;
  subtasks: {
    isDone: boolean;
  }[];
  creator?: {
    id: string;
    imageUrl?: string | null;
    fullName: string;
  } | null;
}

export interface TaskGridItemProps {
  task?: TaskGridItemType;
}

export function TaskGridItem({ task }: TaskGridItemProps) {
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
    <GridItem>
      {/* --- Checkbox & Menu --- */}
      <GridItemTop>
        {!task ? (
          <MenuTriggerSkeleton className="-mr-2 ml-auto" />
        ) : (
          <>
            <Checkbox aria-label={task.title} />
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
              renderButton={() => (
                <Button
                  aria-label="project menu"
                  variant="ghost"
                  iconLeft={
                    <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
                  }
                  className="-mr-2 rounded-full"
                />
              )}
            >
              <Item textValue="Delete" key="delete">
                <Trash size={16} /> Delete
              </Item>
              <Item textValue="Mark as Pending" key="pending">
                <CircleEllipsis size={16} /> Mark as Pending
              </Item>
              <Item textValue="Mark as Done" key="done">
                <Check size={16} />
                Mark as Done
              </Item>
              <Item textValue="Mark as Active" key="active">
                <Clock size={16} />
                Mark as Active
              </Item>
            </ResponsiveMenuTrigger>
          </>
        )}
      </GridItemTop>
      <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-4">
        {/* --- Task Details --- */}
        {!task ? (
          <GridItemInfoSkeleton className="max-sm:w-full max-sm:items-center" />
        ) : (
          <GridItemInfo className="max-sm:w-full max-sm:items-center sm:flex-auto">
            <GridItemTitle>
              <RACDialogTrigger>
                <RACButton
                  className={(renderProps) =>
                    focusRing({ ...renderProps, className: "cursor-pointer" })
                  }
                >
                  {task.title}
                </RACButton>
                <TaskDetailModal taskId={task.id} />
              </RACDialogTrigger>
            </GridItemTitle>

            <GridItemText>{`Deadline on ${formattedDeadline}`}</GridItemText>
          </GridItemInfo>
        )}

        {/* --- Creator Image --- */}
        {!task ? (
          <ImageContainerSkeleton className="h-9 w-9" />
        ) : task.creator?.imageUrl ? (
          <Link href={`/users/${task.creator.id}`}>
            <ImageContainer className="h-9 w-9">
              <Image
                fill
                src={task.creator.imageUrl}
                alt={task.creator.fullName}
              />
            </ImageContainer>
          </Link>
        ) : (
          <ImageContainer className="h-9 w-9" />
        )}
      </div>

      {/* --- Progress --- */}
      {!task ? (
        <GridItemProgressSkeleton />
      ) : (
        <GridItemProgress
          value={progressValue}
          showValueText={false}
          aria-label="task progress"
        />
      )}
    </GridItem>
  );
}
