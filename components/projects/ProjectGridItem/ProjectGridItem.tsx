"use client";

import {
  useProjectSelection,
  useSyncSelectionProjectItem,
} from "@/lib/hooks/useProjectSelection";

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
import { ProjectStatus } from "@/generated/prisma/enums";
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
  status: ProjectStatus;
  tasksTotal: number;
  tasksCompleted: number;
  commentModalTrigger: React.ReactNode;
  menuTrigger: React.ReactNode;
}

export function ProjectGridItem({
  id,
  title,
  deadline,
  creator,
  status,
  tasksTotal,
  tasksCompleted,
  commentModalTrigger,
  menuTrigger,
}: ProjectGridItemProps) {
  const t = useTranslations("projects");

  const { isSelected, toggleItem } = useProjectSelection();
  useSyncSelectionProjectItem(id, title);

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
      checkboxSlot={
        <Checkbox
          aria-label={title}
          isSelected={isSelected(id)}
          onChange={() => toggleItem(id)}
        />
      }
      menuTriggerSlot={menuTrigger}
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
      commentsSlot={commentModalTrigger}
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
