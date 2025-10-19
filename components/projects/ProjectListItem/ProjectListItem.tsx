"use client";

import { useMemo } from "react";
import { Link } from "@/components/ui";
import { ProjectPreview } from "@/lib/queries/types";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import { DONE_TASK_STATUS_ID } from "@/lib/queries/constants";
import { Item } from "react-stately";
import { Checkbox, Button } from "@/components/ui";
import Image from "next/image";
import {
  ListItem,
  ListItemActionMenuDialogHeader,
  listItemActionMenuItemStyles,
  ListItemActionMenuSkeleton,
  ListItemInfo,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
  ListItemProgress,
  ListItemProgressSkeleton,
} from "@/components/common/List/index";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";

export const ProjectListItem = ({
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

  const progressValue = useMemo(() => {
    if (!project || project.tasks.length === 0) return 0;
    const tasksDone = project.tasks.filter(
      (task) => task.statusId === DONE_TASK_STATUS_ID,
    ).length;
    return (tasksDone / project.tasks.length) * 100;
  }, [project]);

  return (
    <ListItem>
      {project && showCheckbox && <Checkbox aria-label="project checkbox" />}

      {/* --- Project Details --- */}
      {!project ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemTitle>
            <Link href={`/projects/${project.id}`}>{project.title}</Link>
          </ListItemTitle>

          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      )}

      {/* --- Category --- */}
      {!project ? (
        <ListItemInfoSkeleton className="@max-2xl:hidden" />
      ) : (
        <ListItemInfo className="@max-2xl:hidden">
          <ListItemTitle>Category</ListItemTitle>

          <ListItemText>
            <Link href={`/categories=${project.category.id}`}>
              {project.category.name}
            </Link>
          </ListItemText>
        </ListItemInfo>
      )}

      {/* --- Customer --- */}
      {!project ? (
        <ListItemInfoSkeleton className="@max-3xl:hidden" />
      ) : (
        <ListItemInfo className="@max-3xl:hidden">
          <ListItemTitle>Customer</ListItemTitle>

          {project.customer ? (
            <ListItemText>
              <Link href={`/customers=${project.customer.id}`}>
                {project.customer.fullName}
              </Link>
            </ListItemText>
          ) : (
            <ListItemText>Unknown customer</ListItemText>
          )}
        </ListItemInfo>
      )}

      {/* --- Customer company --- */}
      {!project ? (
        <ListItemInfoSkeleton className="@max-4xl:hidden" />
      ) : (
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>Customer company</ListItemTitle>

          <ListItemText>
            {project.customer
              ? project.customer.company.name
              : "Unknown company"}
          </ListItemText>
        </ListItemInfo>
      )}

      {/* --- Status --- */}
      {!project ? (
        <ListItemInfoSkeleton className="@max-5xl:hidden" />
      ) : (
        <ListItemInfo className="@max-5xl:hidden">
          <ListItemTitle>Status</ListItemTitle>
          <ListItemText>{project.status.nameEn}</ListItemText>
        </ListItemInfo>
      )}

      {/* --- Right side (progress, creator, menu) --- */}
      <div className="flex flex-none items-center justify-end gap-4">
        {/* --- Progress --- */}
        {!project ? (
          <ListItemProgressSkeleton />
        ) : (
          <ListItemProgress
            value={progressValue}
            showValueText={false}
            aria-label="project progress"
          />
        )}

        {/* --- Creator Image & Menu --- */}
        <div className="flex items-center gap-2">
          {!project ? (
            <ImageContainerSkeleton className="h-8 w-8" />
          ) : project.creator?.imageUrl ? (
            <Link href={`/users/${project.creator.id}`}>
              <ImageContainer className="h-8 w-8">
                <Image
                  fill
                  src={project.creator.imageUrl}
                  alt={project.creator.fullName}
                />
              </ImageContainer>
            </Link>
          ) : (
            <ImageContainer className="h-8 w-8" />
          )}

          {!project ? (
            <ListItemActionMenuSkeleton />
          ) : (
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <ListItemActionMenuDialogHeader />}
              renderButton={() => (
                <Button
                  aria-label="project menu"
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
              <Item textValue="Mark as Competed" key="competed">
                <div className={listItemActionMenuItemStyles}>
                  <Check size={16} />
                  Mark as Competed
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
