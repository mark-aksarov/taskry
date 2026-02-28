"use client";

import {
  GridItemText,
  GridItemInfo,
  GridItemTitle,
  GridItemProgress,
  GridItemTitleDetailModalTrigger,
} from "@/components/common/Grid";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import {
  ProjectItemPendingOverlay,
  ProjectItemActionMenuTrigger,
} from "../ProjectItem";

import { memo } from "react";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectItemCheckbox } from "../ProjectItem/ProjectItemCheckbox";
import { UpdateProjectTransitionProvider } from "../UpdateProjectTransitionContext";
import { DeleteProjectTransitionProvider } from "../DeleteProjectTransitionContext";
import { UpdateProjectStatusTransitionProvider } from "../UpdateProjectStatusTransitionContext";

export interface ProjectGridItemProps {
  id: number;
  title: string;
  deadline: string;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  commentsCount: number;
  status: ProjectStatus;
  tasksTotal: number;
  tasksCompleted: number;
  projectCommentsContainer: React.ReactNode;
  editProjectFormContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  userDetailContainer?: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusesPayload>;
  deleteProject: ActionFn<ActionState, DeleteProjectsPayload>;
}

export const ProjectGridItem = (props: ProjectGridItemProps) => {
  const t = useTranslations("projects.ProjectGridItem");

  const selected = useSelectedProjects();

  return (
    <UpdateProjectTransitionProvider>
      <DeleteProjectTransitionProvider>
        <UpdateProjectStatusTransitionProvider>
          <ProjectItemPendingOverlay projectId={props.id}>
            <SelectableItem
              {...selected}
              item={{ id: props.id, status: props.status }}
            >
              <ProjectGridItemInner {...props} />
            </SelectableItem>
          </ProjectItemPendingOverlay>
        </UpdateProjectStatusTransitionProvider>
      </DeleteProjectTransitionProvider>
    </UpdateProjectTransitionProvider>
  );
};

export const ProjectGridItemInner = memo(
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
    editProjectFormContainer,
    projectDetailContainer,
    userDetailContainer,
    sendComment,
    updateComment,
    updateProjectStatus,
    deleteProject,
  }: ProjectGridItemProps) => {
    const t = useTranslations("projects.ProjectGridItem");

    // use useFormatter to format the date according to the user's locale
    const format = useFormatter();

    const deadlineOn = t("deadlineOn", {
      date: format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    const creatorImg = creator?.imageUrl ? (
      <ImageContainer className="h-9 w-9">
        <Image
          src={creator.imageUrl}
          alt={creator.fullName}
          width={36}
          height={36}
        />
      </ImageContainer>
    ) : (
      <UnknownUser className="h-9 w-9" />
    );

    return (
      <ProjectGridItemLayout
        checkboxSlot={<ProjectItemCheckbox id={id} status={status} />}
        menuTriggerSlot={
          <ProjectItemActionMenuTrigger
            projectId={id}
            projectTitle={title}
            projectStatus={status}
            editProjectFormContainer={editProjectFormContainer}
            className="-mr-2"
            updateProjectStatus={updateProjectStatus}
            deleteProject={deleteProject}
          />
        }
        mainSlot={
          <>
            {/* Show modal on desktop */}
            <GridItemInfo className="flex-auto max-md:hidden">
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

              <GridItemText>{deadlineOn}</GridItemText>
            </GridItemInfo>

            {/* Show only text on mobile */}
            <GridItemInfo className="flex-auto md:hidden">
              <GridItemTitle>{title}</GridItemTitle>
              <GridItemText>{deadlineOn}</GridItemText>
            </GridItemInfo>
          </>
        }
        creatorImageSlot={
          creator ? (
            <>
              {/* Show modal on desktop */}
              <ItemBaseDetailModalTrigger
                className="max-md:hidden"
                modal={
                  <UserDetailModal
                    userId={creator.id}
                    userDetailContainer={userDetailContainer}
                  />
                }
              >
                {creatorImg}
              </ItemBaseDetailModalTrigger>

              {/* Show link on mobile */}
              <Link className="md:hidden" href={`/team/${creator.id}`}>
                {creatorImg}
              </Link>
            </>
          ) : (
            <UnknownUser className="h-9 w-9" />
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
          <GridItemProgress
            value={(tasksCompleted / tasksTotal) * 100}
            showValueText={false}
            aria-label={t("progressAriaLabel")}
          />
        }
      />
    );
  },
);
