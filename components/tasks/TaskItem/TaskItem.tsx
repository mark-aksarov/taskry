"use client";

import { useMemo } from "react";
import { TaskPreview } from "@/lib/queries/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  Check,
  CheckCheck,
  CircleEllipsis,
  Clock,
  Ellipsis,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  ACTIVE_TASK_STATUS_ID,
  PENDING_TASK_STATUS_ID,
} from "@/lib/queries/constants";
import Image from "next/image";
import { MenuTrigger } from "@/components/ui/Menu";
import { Button } from "@/components/ui/Button";
import { Item } from "react-stately";
import { twMerge } from "tailwind-merge";
import { BaseItem } from "@/components/common/BaseItem";
import { DialogHeader } from "@/components/ui/Dialog";

export const TaskItem = ({ task }: { task: TaskPreview }) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!task.deadline) return "";

    const date = new Date(task.deadline);

    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [task.deadline, locale]);

  const subtasksDone = task.subtasks.filter((subtask) => subtask.isDone).length;

  const baseOverflow = "overflow-hidden text-nowrap overflow-ellipsis";
  const itemClasses = "flex items-center gap-4 font-semibold";
  const detailsClasses = "flex shrink-0 grow-0 flex-col gap-1";
  const titleClasses = `${baseOverflow} text-sm font-semibold text-black dark:text-white`;
  const descriptionClasses = `${baseOverflow} text-xs font-medium text-gray-500 dark:text-gray-400`;

  const taskDetails = (
    <div className={twMerge("w-[10rem]", detailsClasses)}>
      <h4 className={titleClasses}>{task.title}</h4>
      <span className={descriptionClasses}>
        Deadline on {formattedDeadline}
      </span>
    </div>
  );

  const categoryDetails = (
    <div className={twMerge("w-[7rem] @max-2xl:hidden", detailsClasses)}>
      <h4 className={titleClasses}>Category</h4>
      <span className={descriptionClasses}>{task.category.name}</span>
    </div>
  );

  const progressBar = (
    <ProgressBar
      value={(subtasksDone / task.subtasks.length) * 100}
      label={
        <div className="flex items-center gap-1">
          <CheckCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {subtasksDone}/{task.subtasks.length}
        </div>
      }
      className="w-[calc(9.25rem + 10cqw)] max-w-[13.25rem] shrink-1 grow-1 @max-md:hidden"
    />
  );

  const statusBadge = (
    <Badge
      color={
        task.statusId === PENDING_TASK_STATUS_ID
          ? "orange"
          : task.statusId === ACTIVE_TASK_STATUS_ID
            ? "green"
            : "blue"
      }
      className="w-[5.5rem] shrink-0 grow-0 @max-xl:hidden"
    >
      {task.status.nameEn}
    </Badge>
  );

  const creatorImage = task.creator?.imageUrl && (
    <Image
      width={32}
      height={32}
      src={task.creator.imageUrl}
      alt=""
      className="h-8 w-8 shrink-0 grow-0 rounded-full"
    />
  );

  const renderButton = (className?: string) => (
    <Button
      aria-label="task item menu"
      variant="ghost"
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className={twMerge("shrink-0 grow-0 rounded-full", className)}
    />
  );

  const menuItems = [
    <Item textValue="Delete" key="delete">
      <div className={itemClasses}>
        <Trash size={16} /> Delete
      </div>
    </Item>,
    <Item textValue="Mark as Pending" key="pending">
      <div className={itemClasses}>
        <CircleEllipsis size={16} /> Mark as Pending
      </div>
    </Item>,
    <Item textValue="Mark as Done" key="done">
      <div className={itemClasses}>
        <Check size={16} />
        Mark as Done
      </div>
    </Item>,
    <Item textValue="Mark as Active" key="active">
      <div className={itemClasses}>
        <Clock size={16} />
        Mark as Active
      </div>
    </Item>,
  ];

  const actionsMenu = (
    <>
      <MenuTrigger
        overlayType="bottomsheet"
        renderDialogHeader={() => (
          <DialogHeader className="px-4 py-3" titleClassName="text-base">
            Actions
          </DialogHeader>
        )}
        renderButton={() => renderButton("md:hidden")}
      >
        {menuItems}
      </MenuTrigger>
      <MenuTrigger
        renderButton={() => renderButton("max-md:hidden")}
        placement="bottom right"
      >
        {menuItems}
      </MenuTrigger>
    </>
  );

  return (
    <BaseItem className="justify-between gap-8">
      {taskDetails}
      {categoryDetails}
      {progressBar}
      <div className="flex items-center gap-8">
        {statusBadge}
        <div className="flex items-center gap-2">
          {creatorImage}
          {actionsMenu}
        </div>
      </div>
    </BaseItem>
  );
};
