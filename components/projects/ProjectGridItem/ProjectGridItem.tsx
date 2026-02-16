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

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectItemCheckbox } from "../ProjectItemCheckbox";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ItemBaseDetailModalTrigger } from "@/components/common/ItemBase";
import { ProjectCommentsModalTrigger } from "../ProjectCommentsModalTrigger";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";

export interface ProjectGridItemProps {
  id: number;
  title: string;
  deadline: Date;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  commentsCount: number;
  status: ProjectStatus;
  tasksTotal: number;
  tasksCompleted: number;
  projectCommentsModal: React.ReactNode;
  menuTrigger: React.ReactNode;
  projectDetailModal: React.ReactNode;
  userDetailModal?: React.ReactNode;
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

export const ProjectGridItem = ({
  updateProjectStatus,
  ...props
}: ProjectGridItemProps) => {
  return (
    <UpdateProjectStatusProvider updateStatus={updateProjectStatus}>
      <ProjectGridItemInner {...props} />
    </UpdateProjectStatusProvider>
  );
};

export function ProjectGridItemInner({
  id,
  title,
  deadline,
  creator,
  commentsCount,
  status,
  tasksTotal,
  tasksCompleted,
  projectCommentsModal,
  menuTrigger,
  projectDetailModal,
  userDetailModal,
}: Omit<ProjectGridItemProps, "updateProjectStatus">) {
  const t = useTranslations("projects.ProjectGridItem");

  const format = useFormatter();

  const deadlineOn = t("deadlineOn", {
    date: format.dateTime(deadline, {
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
      menuTriggerSlot={menuTrigger}
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={projectDetailModal}
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
              modal={userDetailModal}
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
        <ProjectCommentsModalTrigger
          data-test={`project-${id}-comments-modal-trigger`}
          commentsCount={commentsCount}
          modal={projectCommentsModal}
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
