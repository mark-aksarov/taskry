"use client";

import {
  GridItemText,
  GridItemInfo,
  GridItemTitle,
  GridItemProgress,
  GridItemTitleDetailModalTrigger,
} from "@/components/common/Grid";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import { memo } from "react";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectItemCheckbox } from "../ProjectItem/ProjectItemCheckbox";
import { ProjectItemActionMenuTrigger, ProjectItemProps } from "../ProjectItem";

export type ProjectGridItemProps = Omit<
  ProjectItemProps,
  "customer" | "category" | "company" | "customerDetailContainer"
>;

export const ProjectGridItem = memo(
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
