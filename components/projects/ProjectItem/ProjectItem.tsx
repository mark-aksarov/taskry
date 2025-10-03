"use client";

import { useMemo } from "react";
import { ProjectPreview } from "@/lib/queries/types";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import {
  ACTIVE_PROJECT_STATUS_ID,
  DONE_TASK_STATUS_ID,
  PENDING_PROJECT_STATUS_ID,
} from "@/lib/queries/constants";
import { Item } from "react-stately";
import { Checkbox } from "@/components/ui/Checkbox";
import { twMerge } from "tailwind-merge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

const baseOverflow = "overflow-hidden text-nowrap overflow-ellipsis";
const titleClasses = `${baseOverflow} text-sm font-bold text-black dark:text-white`;
const descriptionClasses = `${baseOverflow} text-xs font-medium text-gray-500 dark:text-gray-400`;

const ProjectDetails = ({
  project,
  showCheckbox,
}: {
  project?: ProjectPreview;
  showCheckbox?: boolean;
}) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!project?.deadline) return "";
    return new Date(project.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [project?.deadline, locale]);

  const classes = "flex min-w-[10rem] flex-1 gap-4 overflow-hidden";

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
      {project && showCheckbox && <Checkbox aria-label="project checkbox" />}

      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className={titleClasses}>{project.title}</h4>
        <span
          className={descriptionClasses}
        >{`Deadline on ${formattedDeadline}`}</span>
      </div>
    </div>
  );
};

const ProjectCategory = ({ project }: { project?: ProjectPreview }) => {
  const classes = "min-w-[10rem] flex-1 @max-3xl:hidden overflow-hidden";

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
      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className={titleClasses}>Category</h4>
        <span className={descriptionClasses}>{project.category.name}</span>
      </div>
    </div>
  );
};

const ProjectCustomer = ({ project }: { project?: ProjectPreview }) => {
  const classes = "min-w-[10rem] flex-1 @max-5xl:hidden overflow-hidden";

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
      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className={titleClasses}>Customer</h4>
        <span className={descriptionClasses}>
          {project.customer ? project.customer.fullName : "Unknown customer"}
        </span>
      </div>
    </div>
  );
};

const ProjectCustomerCompany = ({ project }: { project?: ProjectPreview }) => {
  const classes = "min-w-[10rem] flex-1 @max-7xl:hidden overflow-hidden";

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
      <div className="flex flex-col gap-1 overflow-hidden">
        <h4 className={titleClasses}>Customer company</h4>
        <span className={descriptionClasses}>
          {project.customer
            ? project.customer.company.name
            : "Unknown customer"}
        </span>
      </div>
    </div>
  );
};

const ProjectProgress = ({ project }: { project?: ProjectPreview }) => {
  const classes = "w-[10rem] @max-md:hidden";

  if (!project) {
    return (
      <div className={classes}>
        <Skeleton size="xs" />
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

const ProjectActionMenu = ({ project }: { project?: ProjectPreview }) => {
  const itemClasses = "flex items-center gap-4 font-bold";

  if (!project) {
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

const ProjectStatusBadge = ({ project }: { project?: ProjectPreview }) => {
  const classes = "w-[5.5rem] px-0 @max-xl:hidden";

  if (!project) {
    return <Skeleton className={twMerge(classes, "h-[1.75rem]")} />;
  }

  return (
    <Badge
      color={
        project.statusId === PENDING_PROJECT_STATUS_ID
          ? "orange"
          : project.statusId === ACTIVE_PROJECT_STATUS_ID
            ? "green"
            : "blue"
      }
      className={classes}
    >
      {project.status.nameEn}
    </Badge>
  );
};

const ProjectCreatorImage = ({ project }: { project?: ProjectPreview }) => {
  const classes = "h-8 w-8 bg-gray-200 rounded-full overflow-hidden relative";

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

export const ProjectItem = ({
  project,
  showCheckbox,
}: {
  project?: ProjectPreview;
  showCheckbox?: boolean;
}) => {
  return (
    <div className="@container flex w-full items-center gap-8 border-gray-300 bg-white py-3 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800">
      <ProjectDetails project={project} showCheckbox={showCheckbox} />
      <ProjectCategory project={project} />
      <ProjectCustomer project={project} />
      <ProjectCustomerCompany project={project} />
      <div className="flex flex-none items-center justify-end gap-8">
        <ProjectProgress project={project} />
        <ProjectStatusBadge project={project} />
        <div className="flex items-center gap-2">
          <ProjectCreatorImage project={project} />
          <ProjectActionMenu project={project} />
        </div>
      </div>
    </div>
  );
};
