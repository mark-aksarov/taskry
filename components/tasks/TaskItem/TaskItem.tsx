"use client";

import { useMemo } from "react";
import { TaskPreview } from "@/lib/queries/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  ACTIVE_TASK_STATUS_ID,
  PENDING_TASK_STATUS_ID,
} from "@/lib/queries/constants";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Item } from "react-stately";
import { twMerge } from "tailwind-merge";
import { BaseItem } from "@/components/common/BaseItem";
import {
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui/Dialog";
import { Skeleton } from "@/components/ui/Skeleton";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { Checkbox } from "@/components/ui/Checkbox";

const baseOverflow = "overflow-hidden text-nowrap overflow-ellipsis";
const titleClasses = `${baseOverflow} text-sm font-bold text-black dark:text-white`;
const descriptionClasses = `${baseOverflow} text-xs font-medium text-gray-500 dark:text-gray-400`;

type TaskDetailBlockProps = {
  task?: TaskPreview;
  title: string;
  value?: string;
  className?: string;
};

const TaskDetailBlock = ({
  task,
  title,
  value,
  className,
}: TaskDetailBlockProps) => {
  const classes = twMerge("flex flex-col gap-1", className);

  if (!task) {
    return (
      <div className={classes}>
        <Skeleton className="w-50/100" size="sm" />
        <Skeleton className="w-35/100" size="xs" />
      </div>
    );
  }

  return (
    <div className={classes}>
      <h4 className={titleClasses}>{title}</h4>
      <span className={descriptionClasses}>{value}</span>
    </div>
  );
};

const TaskDetails = ({
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

  return (
    <div className="flex flex-1 gap-4">
      {showCheckbox && <Checkbox aria-label="task checkbox" />}
      <TaskDetailBlock
        task={task}
        title={task?.title ?? ""}
        value={task ? `Deadline on ${formattedDeadline}` : ""}
      />
    </div>
  );
};

const TaskCategory = ({ task }: { task?: TaskPreview }) => (
  <TaskDetailBlock
    task={task}
    title="Category"
    value={task?.category?.name}
    className="min-w-[10rem] flex-1 @max-3xl:hidden"
  />
);

const TaskProject = ({ task }: { task?: TaskPreview }) => (
  <TaskDetailBlock
    task={task}
    title="Project"
    value={task?.project?.title}
    className="min-w-[10rem] flex-1 @max-5xl:hidden"
  />
);

const TaskProgress = ({ task }: { task?: TaskPreview }) => {
  const classes = "w-[10rem] shrink-0 @max-md:hidden";

  if (!task) {
    return <Skeleton className={classes} size="xs" />;
  }

  const subtasksDone = task.subtasks.filter((subtask) => subtask.isDone).length;

  return (
    <ProgressBar
      value={(subtasksDone / task.subtasks.length) * 100}
      showValueText={false}
      aria-label="task progress"
      className={classes}
    />
  );
};

const TaskActionMenu = ({ task }: { task?: TaskPreview }) => {
  const itemClasses = "flex items-center gap-4 font-bold";

  if (!task) {
    return (
      <div className="p-2">
        <Skeleton className="h-1 w-4" />
      </div>
    );
  }

  return (
    <ResponsiveMenuTrigger
      placement="bottom right"
      renderDialogHeader={() => (
        <DialogHeader className="px-4 py-3">
          <DialogHeading className="text-base">Actions</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      renderButton={() => (
        <Button
          aria-label="task item menu"
          variant="ghost"
          iconLeft={
            <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="shrink-0 grow-0 rounded-full"
        />
      )}
    >
      <Item textValue="Delete" key="delete">
        <div className={itemClasses}>
          <Trash size={16} /> Delete
        </div>
      </Item>
      <Item textValue="Mark as Pending" key="pending">
        <div className={itemClasses}>
          <CircleEllipsis size={16} /> Mark as Pending
        </div>
      </Item>
      <Item textValue="Mark as Done" key="done">
        <div className={itemClasses}>
          <Check size={16} />
          Mark as Done
        </div>
      </Item>
      <Item textValue="Mark as Active" key="active">
        <div className={itemClasses}>
          <Clock size={16} />
          Mark as Active
        </div>
      </Item>
    </ResponsiveMenuTrigger>
  );
};

const TaskStatusBadge = ({ task }: { task?: TaskPreview }) => {
  const classes = "w-[5.5rem] shrink-0 grow-0 @max-xl:hidden";

  if (!task) {
    return <Skeleton className={twMerge(classes, "h-[1.75rem]")} />;
  }

  return (
    <Badge
      color={
        task.statusId === PENDING_TASK_STATUS_ID
          ? "orange"
          : task.statusId === ACTIVE_TASK_STATUS_ID
            ? "green"
            : "blue"
      }
      className={classes}
    >
      {task.status.nameEn}
    </Badge>
  );
};

const TaskCreatorImage = ({ task }: { task?: TaskPreview }) => {
  const classes =
    "h-8 w-8 shrink-0 grow-0 bg-gray-200 rounded-full overflow-hidden";

  if (!task) {
    return <Skeleton className={classes} />;
  }

  return (
    <div className={classes}>
      {task.creator && task.creator.imageUrl && (
        <Image
          width={32}
          height={32}
          src={task.creator.imageUrl}
          alt={task.creator.name}
        />
      )}
    </div>
  );
};

export const TaskItem = ({
  task,
  showCheckbox,
}: {
  task?: TaskPreview;
  showCheckbox?: boolean;
}) => {
  return (
    <BaseItem className="gap-8">
      <TaskDetails task={task} showCheckbox={showCheckbox} />
      <TaskCategory task={task} />
      <TaskProject task={task} />
      <div className="flex flex-none items-center justify-end gap-8">
        <TaskProgress task={task} />
        <TaskStatusBadge task={task} />
        <div className="flex items-center gap-2">
          <TaskCreatorImage task={task} />
          <TaskActionMenu task={task} />
        </div>
      </div>
    </BaseItem>
  );
};
