"use client";

import {
  GridItemText,
  GridItemInfo,
  GridItemTitle,
} from "@/components/common/Grid";

import {
  ItemBaseDeadline,
  ItemBaseUserImageContainer,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import {
  BaseProjectItemProps,
  ProjectItemPendingOverlay,
  ProjectItemActionMenuTrigger,
} from "../ProjectItem";

import { memo } from "react";
import { Link } from "@/components/ui/Link";
import { UpdateProjectModal } from "../UpdateProjectModal";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { ProjectGridItemProgress } from "./ProjectGridItemProgress";

interface Props extends BaseProjectItemProps {
  tasksTotal: number;
  tasksCompleted: number;
}

export function ProjectGridItemMobile(props: Props) {
  return (
    <ProjectItemPendingOverlay projectId={props.id}>
      <div className="relative block">
        <Link href={`/projects/${props.id}`} className="absolute inset-0 z-0" />
        <ProjectGridItemMobileInner {...props} />
      </div>
    </ProjectItemPendingOverlay>
  );
}

export const ProjectGridItemMobileInner = memo(
  ({
    id,
    title,
    deadline,
    creator,
    commentsCount,
    status,
    tasksTotal,
    tasksCompleted,
    projectCommentsContainer,
    updateProjectFormContainer,
    sendComment,
    updateComment,
  }: Props) => {
    const creatorImg = (
      <ItemBaseUserImageContainer
        user={creator}
        className="z-1 h-11 w-11"
        width={44}
        height={44}
      />
    );

    return (
      <>
        <ProjectGridItemLayout
          menuTriggerSlot={
            <ProjectItemActionMenuTrigger
              projectId={id}
              projectTitle={title}
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
              <Link href={`/team/${creator.id}`}>{creatorImg}</Link>
            ) : (
              creatorImg
            )
          }
          commentsSlot={
            <ItemBaseCommentsModalTrigger
              data-test={`project-${id}-comments-modal-trigger`}
              commentsCount={commentsCount}
              modal={
                <ProjectCommentsModal
                  projectId={id}
                  projectCommentsContainer={projectCommentsContainer}
                  sendComment={sendComment}
                  updateComment={updateComment}
                />
              }
              className="relative z-1"
            />
          }
          statusSlot={
            <ProjectItemBaseBadge
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

        {/* Modal for editing project details */}
        <UpdateProjectModal
          updateProjectFormContainer={updateProjectFormContainer}
        />
      </>
    );
  },
);
