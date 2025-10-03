"use client";

import { Card } from "@/components/common/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { ProjectPreview } from "@/lib/queries/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import { Item } from "react-stately";
import { useMemo } from "react";
import Image from "next/image";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DONE_TASK_STATUS_ID } from "@/lib/queries/constants";

const baseOverflow = "overflow-hidden text-nowrap overflow-ellipsis";
const titleClasses = `${baseOverflow} text-sm font-bold text-black dark:text-white`;
const descriptionClasses = `${baseOverflow} text-xs font-medium text-gray-500 dark:text-gray-400`;

const ProjectDetails = ({ project }: { project?: ProjectPreview }) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!project?.deadline) return "";
    return new Date(project.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [project?.deadline, locale]);

  const classes = "flex w-full flex-1 gap-4";

  if (!project) {
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
      <div className="flex flex-col gap-1">
        <h4 className={titleClasses}>{project.title}</h4>
        <span
          className={descriptionClasses}
        >{`Deadline on ${formattedDeadline}`}</span>
      </div>
    </div>
  );
};

const ProjectActionMenu = ({ project }: { project?: ProjectPreview }) => {
  const itemClasses = "flex items-center gap-4 font-bold";

  if (!project) {
    return (
      <div className="flex h-8 w-8 items-center justify-end">
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
          className="-mr-2 rounded-full"
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
      <Item textValue="Mark as Competed" key="competed">
        <div className={itemClasses}>
          <Check size={16} />
          Mark as Competed
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

const ProjectCreatorImage = ({ project }: { project?: ProjectPreview }) => {
  const classes = "h-9 w-9 bg-gray-200 rounded-full overflow-hidden relative";

  if (!project) {
    return <Skeleton className={classes} />;
  }

  return (
    <div className={classes}>
      {project.creator && project.creator.imageUrl && (
        <Image fill src={project.creator.imageUrl} alt={project.creator.name} />
      )}
    </div>
  );
};

const ProjectProgress = ({ project }: { project?: ProjectPreview }) => {
  const classes = "w-full";

  if (!project) {
    return (
      <div className={classes}>
        <Skeleton className="h-2" />
      </div>
    );
  }

  const tasksDone = project.tasks.filter(
    (task) => task.statusId === DONE_TASK_STATUS_ID,
  ).length;
  const value = (tasksDone / project.tasks.length) * 100;

  return (
    <div className={classes}>
      <ProgressBar
        value={value}
        showValueText={false}
        aria-label="project progress"
        className="w-full"
      />
    </div>
  );
};

export function ProjectGridItem({ project }: { project?: ProjectPreview }) {
  return (
    <Card className="rounded-md">
      <div className="flex flex-col gap-4">
        <div className={"flex items-center justify-between"}>
          {project ? (
            <Checkbox aria-label="project checkbox" />
          ) : (
            <Skeleton className="h-5 w-5 rounded-sm" />
          )}
          <ProjectActionMenu project={project} />
        </div>
        <div className="flex items-center justify-between">
          <ProjectDetails project={project} />
          <ProjectCreatorImage project={project} />
        </div>
        <ProjectProgress project={project} />
      </div>
    </Card>
  );
}
