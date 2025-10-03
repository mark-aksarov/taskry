"use client";

import { useMemo } from "react";
import { TaskPreview } from "@/lib/queries/types";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import {
  ACTIVE_TASK_STATUS_ID,
  PENDING_TASK_STATUS_ID,
} from "@/lib/queries/constants";
import { Item } from "react-stately";
import {
  BaseItem,
  BaseItemActionMenu,
  BaseItemDetails,
  BaseItemImage,
  BaseItemProgress,
  BaseItemStatusBadge,
} from "@/components/common/BaseItem";
import { Checkbox } from "@/components/ui/Checkbox";

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
      <BaseItemDetails
        skeleton={!task}
        title={task?.title ?? ""}
        value={task ? `Deadline on ${formattedDeadline}` : ""}
      />
    </div>
  );
};

const TaskCategory = ({ task }: { task?: TaskPreview }) => (
  <BaseItemDetails
    skeleton={!task}
    title="Category"
    value={task?.category?.name}
    className="min-w-[10rem] flex-1 @max-3xl:hidden"
  />
);

const TaskProject = ({ task }: { task?: TaskPreview }) => (
  <BaseItemDetails
    skeleton={!task}
    title="Project"
    value={task?.project?.title}
    className="min-w-[10rem] flex-1 @max-5xl:hidden"
  />
);

const TaskProgress = ({ task }: { task?: TaskPreview }) => {
  const classes = "w-[10rem] shrink-0 @max-md:hidden";

  const subtasksDone =
    task?.subtasks.filter((subtask) => subtask.isDone).length ?? 0;
  const value = task ? (subtasksDone / task.subtasks.length) * 100 : 0;

  return (
    <BaseItemProgress
      skeleton={!task}
      value={value}
      showValueText={false}
      aria-label="task progress"
      className={classes}
    />
  );
};

const TaskActionMenu = ({ task }: { task?: TaskPreview }) => {
  const itemClasses = "flex items-center gap-4 font-bold";

  return (
    <BaseItemActionMenu skeleton={!task}>
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
    </BaseItemActionMenu>
  );
};

const TaskStatusBadge = ({ task }: { task?: TaskPreview }) => {
  const color = task
    ? task.statusId === PENDING_TASK_STATUS_ID
      ? "orange"
      : task.statusId === ACTIVE_TASK_STATUS_ID
        ? "green"
        : "blue"
    : "blue";

  const text = task?.status?.nameEn ?? "";

  return <BaseItemStatusBadge color={color} skeleton={!task} text={text} />;
};

const TaskCreatorImage = ({ task }: { task?: TaskPreview }) => {
  return (
    <BaseItemImage
      skeleton={!task}
      src={task && task.creator ? task.creator.imageUrl : ""}
      alt={task && task.creator ? task.creator.name : ""}
    />
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
