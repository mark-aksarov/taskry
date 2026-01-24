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
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { Checkbox } from "@/components/ui/Checkbox";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";

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
  projectDetailModal: React.ReactNode;
  projectDetailBottomSheet: React.ReactNode;
  userDetailModal?: React.ReactNode;
  userDetailBottomSheet?: React.ReactNode;
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
  projectDetailModal,
  projectDetailBottomSheet,
  userDetailModal,
  userDetailBottomSheet,
}: ProjectGridItemProps) {
  const tStatus = useTranslations("projects.ProjectStatus");
  const t = useTranslations("projects.ProjectGridItem");

  const { isSelected, toggleItem } = useProjectSelection();
  useSyncSelectionProjectItem(id, title, status);

  const format = useFormatter();

  const deadlineOn = deadline
    ? t("deadlineOn", {
        date: format.dateTime(deadline, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })
    : t("noDeadline");

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
              modal={projectDetailModal}
              className="truncate"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              bottomSheet={projectDetailBottomSheet}
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
            <ItemBaseDetailModalTrigger modal={userDetailModal}>
              {creatorImg}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              bottomSheet={userDetailBottomSheet}
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
          {tStatus(`${status}`)}
        </ItemBaseBadge>
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
}
