"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Checkbox, Button, Link } from "@/components/ui";
import { DONE_TASK_STATUS_ID } from "@/lib/queries/constants";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  GridItem,
  GridItemInfo,
  GridItemProgress,
  GridItemText,
  GridItemTitle,
  GridItemTop,
  GridItemInfoSkeleton,
  GridItemProgressSkeleton,
} from "@/components/common/Grid";
import {
  ImageContainer,
  ImageContainerSkeleton,
} from "@/components/common/ImageContainer";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";

export interface ProjectGridItemType {
  id: number;
  title: string;
  deadline?: string | Date | null;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string | null;
  } | null;
  tasks: {
    statusId: number;
  }[];
}

export interface ProjectGridItemProps {
  project?: ProjectGridItemType | null;
}

export function ProjectGridItem({ project }: ProjectGridItemProps) {
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
          <MenuTriggerSkeleton className="-mr-2 ml-auto" />
        ) : (
          <>
            <Checkbox aria-label={project.title} />
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
                  className="-mr-2 rounded-full"
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
              <Link href={`/projects/${project.id}`}>{project.title}</Link>
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
