"use client";

import { useMemo } from "react";
import { TaskPreview } from "@/lib/queries/types";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import {
  ACTIVE_TASK_STATUS_ID,
  PENDING_TASK_STATUS_ID,
} from "@/lib/queries/constants";
import { Item } from "react-stately";
import { Checkbox } from "@/components/ui/Checkbox";
import { Skeleton } from "@/components/ui/Skeleton";
import { twMerge } from "tailwind-merge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

const baseOverflow = "overflow-hidden text-nowrap overflow-ellipsis";
const titleClasses = `${baseOverflow} text-sm font-bold text-black dark:text-white`;
const descriptionClasses = `${baseOverflow} text-xs font-medium text-gray-500 dark:text-gray-400`;

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

  const classes = "flex min-w-[10rem] flex-1 gap-4 overflow-hidden";

  if (!task) {
    return (
      <div className={classes}>
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="w-50/100" size="sm" />
          <Skeleton className="w-35/100" size="xs" />
        </div>
      </div>
    );
  }

  return (
    <div className={classes}>
      {task && showCheckbox && <Checkbox aria-label="project checkbox" />}

      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className={titleClasses}>{task.title}</h4>
        <span
          className={descriptionClasses}
        >{`Deadline on ${formattedDeadline}`}</span>
      </div>
    </div>
  );
};

const TaskCategory = ({ task }: { task?: TaskPreview }) => {
  const classes = "min-w-[10rem] flex-1 @max-3xl:hidden overflow-hidden";

  if (!task) {
    return (
      <div className={classes}>
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="w-50/100" size="sm" />
          <Skeleton className="w-35/100" size="xs" />
        </div>
      </div>
    );
  }

  return (
    <div className={classes}>
      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className={titleClasses}>Category</h4>
        <span className={descriptionClasses}>{task.category.name}</span>
      </div>
    </div>
  );
};

const TaskProject = ({ task }: { task?: TaskPreview }) => {
  const classes = "min-w-[10rem] flex-1 @max-5xl:hidden overflow-hidden";

  if (!task) {
    return (
      <div className={classes}>
        <div className="flex w-full flex-col gap-1">
          <Skeleton className="w-50/100" size="sm" />
          <Skeleton className="w-35/100" size="xs" />
        </div>
      </div>
    );
  }

  return (
    <div className={classes}>
      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className={titleClasses}>Project</h4>
        <span className={descriptionClasses}>{task.project.title}</span>
      </div>
    </div>
  );
};

const TaskProgress = ({ task }: { task?: TaskPreview }) => {
  const classes = "w-[10rem] @max-md:hidden";

  if (!task) {
    return (
      <div className={classes}>
        <Skeleton size="xs" />
      </div>
    );
  }

  const subtasksDone = task.subtasks.filter((subtask) => subtask.isDone).length;
  const value = (subtasksDone / task.subtasks.length) * 100;

  return (
    <div className={classes}>
      <ProgressBar
        value={value}
        showValueText={false}
        aria-label="project progress"
        className={classes}
      />
    </div>
  );
};

const TaskActionMenu = ({ task }: { task?: TaskPreview }) => {
  const itemClasses = "flex items-center gap-4 font-bold";

  if (!task) {
    return (
      <div className="flex h-8 w-8 items-center justify-center">
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
          className="rounded-full"
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
  const classes = "w-[5.5rem] px-0 @max-xl:hidden";

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
  const classes = "h-8 w-8 bg-gray-200 rounded-full overflow-hidden relative";

  if (!task) {
    return <Skeleton className={classes} />;
  }

  return (
    <div className={classes}>
      {task.creator && task.creator.imageUrl && (
        <Image fill src={task.creator.imageUrl} alt={task.creator.name} />
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
    <div className="@container flex w-full items-center gap-8 border-gray-300 bg-white py-3 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800">
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
    </div>
  );
};
