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
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";

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
        <ListItemInfoSkeleton className="@max-3xl:hidden" />
      ) : (
        <ListItemInfo className="@max-3xl:hidden">
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
        <ListItemInfoSkeleton className="@max-4xl:hidden" />
      ) : (
        <ListItemInfo className="@max-4xl:hidden">
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
        <ListItemInfoSkeleton className="@max-5xl:hidden" />
      ) : (
        <ListItemInfo className="@max-5xl:hidden">
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
        <ListItemInfoSkeleton className="@max-6xl:hidden" />
      ) : (
        <ListItemInfo className="@max-6xl:hidden">
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
            <MenuTriggerSkeleton />
          ) : (
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
                  className="rounded-full"
                />
              )}
            >
              <Item textValue="Delete" key="delete">
                <Trash size={16} /> Delete
              </Item>
              <Item textValue="Mark as Pending" key="pending">
                <CircleEllipsis size={16} /> Mark as Pending
              </Item>
              <Item textValue="Mark as Competed" key="competed">
                <Check size={16} />
                Mark as Competed
              </Item>
              <Item textValue="Mark as Active" key="active">
                <Clock size={16} />
                Mark as Active
              </Item>
            </ResponsiveMenuTrigger>
          )}
        </div>
      </div>
    </ListItem>
  );
};
