"use client";

import {
  GridItemText,
  GridItemInfo,
  GridItemTitleDetailModalTrigger,
} from "@/components/common/Grid";

import {
  ItemBaseDeadline,
  ItemBaseDetailModalTrigger,
  ItemBaseUserImageContainer,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import {
  BaseProjectItemProps,
  ProjectItemPendingOverlay,
  ProjectItemActionMenuTrigger,
} from "../ProjectItem";

import { memo } from "react";
import { UpdateProjectModal } from "../UpdateProjectModal";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ProjectGridItemProgress } from "./ProjectGridItemProgress";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectItemCheckbox } from "../ProjectItem/ProjectItemCheckbox";

interface Props extends BaseProjectItemProps {
  tasksTotal: number;
  tasksCompleted: number;
  projectDetailContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
}

export function ProjectGridItemLarge(props: Props) {
  const selected = useSelectedProjects();

  return (
    <ProjectItemPendingOverlay projectId={props.id}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <ProjectGridItemLargeInner {...props} />
      </SelectableItem>
    </ProjectItemPendingOverlay>
  );
}

export const ProjectGridItemLargeInner = memo(
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
    projectDetailContainer,
    userDetailContainer,
    userDetailHeaderContainer,
    sendComment,
    updateComment,
  }: Props) => {
    const creatorImg = (
      <ItemBaseUserImageContainer
        user={creator}
        className="h-9 w-9"
        width={36}
        height={36}
      />
    );

    return (
      <>
        <ProjectGridItemLayout
          checkboxSlot={<ProjectItemCheckbox id={id} status={status} />}
          menuTriggerSlot={
            <ProjectItemActionMenuTrigger
              projectId={id}
              projectTitle={title}
              projectStatus={status}
              className="-mr-2"
            />
          }
          mainSlot={
            <GridItemInfo className="flex-auto">
              <GridItemTitleDetailModalTrigger
                modal={
                  <ProjectDetailModal
                    projectId={id}
                    projectDetailContainer={projectDetailContainer}
                  />
                }
              >
                {title}
              </GridItemTitleDetailModalTrigger>

              <GridItemText>
                <ItemBaseDeadline deadline={deadline} />
              </GridItemText>
            </GridItemInfo>
          }
          creatorImageSlot={
            creator ? (
              <ItemBaseDetailModalTrigger
                modal={
                  <UserDetailModal
                    userId={creator.id}
                    userDetailContainer={userDetailContainer}
                    userDetailHeaderContainer={userDetailHeaderContainer}
                  />
                }
              >
                {creatorImg}
              </ItemBaseDetailModalTrigger>
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
