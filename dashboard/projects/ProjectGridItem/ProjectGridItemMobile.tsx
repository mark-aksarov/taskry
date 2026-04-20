"use client";

import {
  GridItemText,
  GridItemInfo,
  GridItemTitle,
} from "@/dashboard/common/GridItem";

import {
  ItemBaseDeadline,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/dashboard/common/ItemBase";

import {
  BaseProjectItemProps,
  ProjectItemActionMenuTrigger,
  useProjectItemPending,
} from "../ProjectItem";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { Link } from "@/ui/Link";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { ProjectItemStatusBadge } from "../ProjectItemStatusBadge";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { ProjectGridItemProgress } from "./ProjectGridItemProgress";
import { ProjectGridItemMobileSkeleton } from "./ProjectGridItemSkeleton";
import { GridItemMobileGate } from "@/dashboard/common/GridItemMobileGate";

interface Props extends BaseProjectItemProps {
  tasksTotal: number;
  tasksCompleted: number;
}

export function ProjectGridItemMobile(props: Props) {
  const isPending = useProjectItemPending(props.id);

  return (
    <GridItemMobileGate skeleton={<ProjectGridItemMobileSkeleton />}>
      <ProjectGridItemMobileInner {...props} isPending={isPending} />
    </GridItemMobileGate>
  );
}

type InnerProps = Props & { isPending: boolean };

export const ProjectGridItemMobileInner = memo(
  function ProjectGridItemMobileInner({
    id,
    isPending,
    title,
    deadline,
    creator,
    commentsCount,
    status,
    tasksTotal,
    tasksCompleted,
  }: InnerProps) {
    const { onOpenChange: onProjectCommentsModalOpenChange } =
      useModal("projectComments");

    const creatorImg = (
      <ItemBaseUserImageContainer
        user={creator}
        className="z-1 h-11 w-11"
        width={44}
        height={44}
      />
    );

    return (
      <div
        className={twMerge(
          "relative block",
          isPending && "pointer-events-none",
        )}
      >
        <Link
          aria-label={title}
          href={`/projects/${id}`}
          className="absolute inset-0 z-0"
        />
        <ProjectGridItemLayout
          className={isPending ? "*:opacity-50" : undefined}
          menuTriggerSlot={
            <ProjectItemActionMenuTrigger
              projectId={id}
              projectStatus={status}
              className="relative z-1 -mr-2 ml-auto"
            />
          }
          mainSlot={
            <GridItemInfo className="flex-auto">
              <GridItemTitle>{title}</GridItemTitle>
              <GridItemText>
                <ItemBaseDeadline deadline={deadline} />
              </GridItemText>
            </GridItemInfo>
          }
          creatorImageSlot={
            creator ? (
              <Link aria-label={creator.fullName} href={`/team/${creator.id}`}>
                {creatorImg}
              </Link>
            ) : (
              creatorImg
            )
          }
          commentsSlot={
            <ItemBaseCommentsButton
              commentsCount={commentsCount}
              onPress={() => onProjectCommentsModalOpenChange(true)}
              className="relative z-1"
            />
          }
          statusSlot={
            <ProjectItemStatusBadge
              projectId={id}
              deadline={deadline}
              status={status}
            />
          }
          progressSlot={
            <ProjectGridItemProgress
              tasksTotal={tasksTotal}
              tasksCompleted={tasksCompleted}
            />
          }
        />
      </div>
    );
  },
);
