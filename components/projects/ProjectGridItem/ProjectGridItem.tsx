"use client";

import {
  GridItemText,
  GridItemInfo,
  GridItemTitle,
  GridItemProgress,
} from "@/components/common/Grid";

import {
  ActionFn,
  ActionState,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectItemCheckbox } from "../ProjectItemCheckbox";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";

export interface ProjectGridItemProps {
  guestMode: boolean;
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
}

export const ProjectGridItem = ({
  updateProjectStatus,
  ...props
}: ProjectGridItemProps) => {
  const selected = useSelectedProjects();

  return (
    <UpdateProjectStatusProvider updateStatus={updateProjectStatus}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <ProjectGridItemInner {...props} />
      </SelectableItem>
    </UpdateProjectStatusProvider>
  );
};

export function ProjectGridItemInner({
  guestMode,
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
}: Omit<ProjectGridItemProps, "updateProjectStatus">) {
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
      <Image fill src={creator.imageUrl} alt={creator.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <ProjectGridItemLayout
      checkboxSlot={<ProjectItemCheckbox id={id} status={status} />}
      menuTriggerSlot={
        <ProjectItemActionMenuTrigger
          guestMode={guestMode}
          projectId={id}
          projectTitle={title}
          projectStatus={status}
          editProjectFormContainer={editProjectFormContainer}
          className="-mr-2"
        />
      }
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={
                <ProjectDetailModal
                  projectId={id}
                  projectDetailContainer={projectDetailContainer}
                />
              }
              className="truncate max-md:hidden"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <Link className="block truncate md:hidden" href={`/projects/${id}`}>
              {title}
            </Link>
          </GridItemTitle>

          <GridItemText>{deadlineOn}</GridItemText>
        </GridItemInfo>
      }
      creatorImageSlot={
        creator ? (
          <>
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
      statusSlot={<ProjectItemBaseBadge projectId={id} status={status} />}
      progressSlot={
        <GridItemProgress
          value={(tasksCompleted / tasksTotal) * 100}
          showValueText={false}
          aria-label={t("progressAriaLabel")}
        />
      }
    />
  );
}
