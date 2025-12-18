"use client";

import {
  ActionFn,
  DeleteProjectState,
  UpdateProjectStatusState,
} from "@/lib/actions/types";

import {
  GridItemText,
  GridItemInfo,
  GridItemTitle,
  GridItemProgress,
} from "@/components/common/Grid";

import {
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { Checkbox, RACDialogTrigger } from "@/components/ui";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectDetailBottomSheet } from "../ProjectDetailBottomSheet";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";
import { UserDetailBottomSheet } from "@/components/users/UserDetailBottomSheet";

export interface ProjectGridItemProps {
  id: number;
  title: string;
  deadline?: Date;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  status: string;
  tasksTotal: number;
  tasksCompleted: number;
  commentsCount: number;

  deleteAction: ActionFn<DeleteProjectState>;
  updateStatusAction: ActionFn<UpdateProjectStatusState>;
}

export function ProjectGridItem({
  id,
  title,
  deadline,
  creator,
  status,
  tasksTotal,
  tasksCompleted,
  commentsCount,
  deleteAction,
  updateStatusAction,
}: ProjectGridItemProps) {
  const t = useTranslations("projects");

  const format = useFormatter();

  const deadlineOn = deadline
    ? t("ProjectGridItem.deadlineOn", {
        date: format.dateTime(deadline, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })
    : t("ProjectGridItem.noDeadline");

  const creatorImg = creator?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={creator.imageUrl} alt={creator.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <ProjectGridItemLayout
      checkboxSlot={<Checkbox aria-label={title} />}
      menuTriggerSlot={
        <ProjectItemActionMenuTrigger
          className="-mr-2"
          projectId={id}
          projectTitle={title}
          projectStatus={status}
          deleteAction={deleteAction}
          updateStatusAction={updateStatusAction}
        />
      }
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>
            <ItemBaseDetailModalTrigger
              modal={<ProjectDetailModal projectId={id} />}
              className="truncate"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              renderBottomSheet={(state) => (
                <ProjectDetailBottomSheet projectId={id} state={state} />
              )}
              className="truncate"
            >
              {title}
            </ItemBaseDetailBottomSheetTrigger>
          </GridItemTitle>

          <GridItemText>{deadlineOn}</GridItemText>
        </GridItemInfo>
      }
      creatorImageSlot={
        creator ? (
          <>
            <ItemBaseDetailModalTrigger
              modal={<UserDetailModal userId={creator.id} />}
            >
              {creatorImg}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              renderBottomSheet={(state) => (
                <UserDetailBottomSheet userId={creator.id} state={state} />
              )}
            >
              {creatorImg}
            </ItemBaseDetailBottomSheetTrigger>
          </>
        ) : (
          <UnknownUser className="h-9 w-9" />
        )
      }
      commentsSlot={
        <RACDialogTrigger>
          <ItemBaseButton
            label={commentsCount}
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />
          <ProjectCommentsModal projectId={id} />
        </RACDialogTrigger>
      }
      statusSlot={
        <ItemBaseBadge color={getProjectStatusBadgeColor(status)}>
          {t(`ProjectStatus.${status}`)}
        </ItemBaseBadge>
      }
      progressSlot={
        <GridItemProgress
          value={(tasksCompleted / tasksTotal) * 100}
          showValueText={false}
          aria-label={t("ProjectGridItem.progressAriaLabel")}
        />
      }
    />
  );
}
