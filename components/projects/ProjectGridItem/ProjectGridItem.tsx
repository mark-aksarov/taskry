"use client";

import { Checkbox, Button, Link } from "@/components/ui";
import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { ProjectPreview } from "@/lib/queries/types";
import { DONE_TASK_STATUS_ID } from "@/lib/queries/constants";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  GridItem,
  gridItemActionMenuItemStyles,
  GridItemInfo,
  GridItemProgress,
  GridItemText,
  GridItemTitle,
  GridItemTop,
  GridItemInfoSkeleton,
  GridItemActionMenuDialogHeader,
  GridItemActionMenuSkeleton,
  GridItemProgressSkeleton,
  GridItemLink,
} from "@/components/common/Grid";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";

export function ProjectGridItem({ project }: { project: ProjectPreview }) {
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
    <GridItem>
      {/* --- Checkbox & Menu --- */}
      <GridItemTop>
        {!project ? (
          <GridItemActionMenuSkeleton />
        ) : (
          <>
            <Checkbox aria-label={project.title} />
            <ResponsiveMenuTrigger
              placement="bottom right"
              renderDialogHeader={() => <GridItemActionMenuDialogHeader />}
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
                <div className={gridItemActionMenuItemStyles}>
                  <Trash size={16} /> Delete
                </div>
              </Item>
              <Item textValue="Mark as Pending" key="pending">
                <div className={gridItemActionMenuItemStyles}>
                  <CircleEllipsis size={16} /> Mark as Pending
                </div>
              </Item>
              <Item textValue="Mark as Competed" key="competed">
                <div className={gridItemActionMenuItemStyles}>
                  <Check size={16} />
                  Mark as Competed
                </div>
              </Item>
              <Item textValue="Mark as Active" key="active">
                <div className={gridItemActionMenuItemStyles}>
                  <Clock size={16} />
                  Mark as Active
                </div>
              </Item>
            </ResponsiveMenuTrigger>
          </>
        )}
      </GridItemTop>
      <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-4">
        {/* --- Project Details --- */}
        {!project ? (
          <GridItemInfoSkeleton className="max-sm:w-full max-sm:items-center" />
        ) : (
          <GridItemInfo className="max-sm:w-full max-sm:items-center sm:flex-1">
            <GridItemTitle>
              <GridItemLink href={`/projects/${project.id}`}>
                {project.title}
              </GridItemLink>
            </GridItemTitle>
            <GridItemText>{`Deadline on ${formattedDeadline}`}</GridItemText>
          </GridItemInfo>
        )}

        {/* --- Creator Image --- */}
        {!project ? (
          <ImageContainerSkeleton className="h-9 w-9" />
        ) : project.creator?.imageUrl ? (
          <Link href={`/users/${project.creator.id}`}>
            <ImageContainer className="h-9 w-9">
              <Image
                fill
                src={project.creator.imageUrl}
                alt={project.creator.fullName}
              />
            </ImageContainer>
          </Link>
        ) : (
          <ImageContainer className="h-9 w-9" />
        )}
      </div>

      {/* --- Progress --- */}
      {!project ? (
        <GridItemProgressSkeleton />
      ) : (
        <GridItemProgress
          value={progressValue}
          showValueText={false}
          aria-label="project progress"
        />
      )}
    </GridItem>
  );
}
