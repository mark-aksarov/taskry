"use client";

import { useMemo } from "react";
import { ProjectPreview } from "@/lib/queries/types";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import {
  ACTIVE_PROJECT_STATUS_ID,
  ACTIVE_TASK_STATUS_ID,
  DONE_TASK_STATUS_ID,
  PENDING_PROJECT_STATUS_ID,
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

  return (
    <div className="flex flex-1 gap-4">
      {project && showCheckbox && <Checkbox aria-label="project checkbox" />}
      <BaseItemDetails
        skeleton={!project}
        title={project?.title ?? ""}
        value={project ? `Deadline on ${formattedDeadline}` : ""}
        className="w-full"
      />
    </div>
  );
};

const ProjectCategory = ({ project }: { project?: ProjectPreview }) => (
  <BaseItemDetails
    skeleton={!project}
    title="Category"
    value={project?.category?.name}
    className="min-w-[10rem] flex-1 @max-3xl:hidden"
  />
);

const ProjectCustomer = ({ project }: { project?: ProjectPreview }) => (
  <BaseItemDetails
    skeleton={!project}
    title="Customer"
    value={project?.customer?.fullName}
    className="min-w-[10rem] flex-1 @max-5xl:hidden"
  />
);

const ProjectCustomerCompany = ({ project }: { project?: ProjectPreview }) => (
  <BaseItemDetails
    skeleton={!project}
    title="Customer company"
    value={project?.customer?.company.name}
    className="min-w-[10rem] flex-1 @max-7xl:hidden"
  />
);

const ProjectProgress = ({ project }: { project?: ProjectPreview }) => {
  const classes = "w-[10rem] @max-md:hidden";

  const subtasksDone =
    project?.tasks.filter((task) => task.statusId === DONE_TASK_STATUS_ID)
      .length ?? 0;
  const value = project ? (subtasksDone / project.tasks.length) * 100 : 0;

  return (
    <BaseItemProgress
      skeleton={!project}
      value={value}
      showValueText={false}
      aria-label="project progress"
      className={classes}
    />
  );
};

const ProjectActionMenu = ({ project }: { project?: ProjectPreview }) => {
  const itemClasses = "flex items-center gap-4 font-bold";

  return (
    <BaseItemActionMenu skeleton={!project}>
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
    </BaseItemActionMenu>
  );
};

const ProjectStatusBadge = ({ project }: { project?: ProjectPreview }) => {
  const color = project
    ? project.statusId === PENDING_PROJECT_STATUS_ID
      ? "orange"
      : project.statusId === ACTIVE_PROJECT_STATUS_ID
        ? "green"
        : "blue"
    : "blue";

  const text = project?.status?.nameEn ?? "";

  return <BaseItemStatusBadge color={color} skeleton={!project} text={text} />;
};

const ProjectCreatorImage = ({ project }: { project?: ProjectPreview }) => {
  return (
    <BaseItemImage
      skeleton={!project}
      src={project && project.creator ? project.creator.imageUrl : ""}
      alt={project && project.creator ? project.creator.name : ""}
    />
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
    <BaseItem className="gap-8">
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
    </BaseItem>
  );
};
