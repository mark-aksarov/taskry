"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Button, Checkbox, Link, RACDialogTrigger } from "@/components/ui";
import {
  Check,
  CircleEllipsis,
  Clock,
  MessageSquare,
  Trash,
} from "lucide-react";
import {
  GridItemInfo,
  GridItemProgress,
  GridItemText,
  GridItemTitle,
} from "@/components/common/Grid";
import { ImageContainer } from "@/components/common/ImageContainer";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import {
  ItemBaseActionMenuTrigger,
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailBottomSheetTrigger,
  ItemBaseDetailModalTrigger,
} from "@/components/common/ItemBase";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectDetailBottomSheet } from "../ProjectDetailBottomSheet";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { UserDetailBottomSheet } from "@/components/users/UserDetailBottomSheet";

export interface ProjectGridItemProps {
  id: number;
  title: string;
  deadline: Date;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  status: {
    id: string;
    name: string;
  };
  tasks: number;
  tasksDone: number;
  comments: number;
}

export function ProjectGridItem({
  id,
  title,
  deadline,
  creator,
  status,
  tasks,
  tasksDone,
  comments,
}: ProjectGridItemProps) {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!deadline) return "";
    return new Date(deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [deadline, locale]);

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
        <ItemBaseActionMenuTrigger className="-mr-2">
          <Item textValue="Delete" key="delete">
            <Trash size={16} /> Delete
          </Item>
          <Item textValue="Mark as Pending" key="pending">
            <CircleEllipsis size={16} /> Mark as Pending
          </Item>
          <Item textValue="Mark as Competed" key="competed">
            <Check size={16} />
            Mark as Competed
          </Item>
          <Item textValue="Mark as Active" key="active">
            <Clock size={16} />
            Mark as Active
          </Item>
        </ItemBaseActionMenuTrigger>
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

          <GridItemText>{`Deadline on ${formattedDeadline}`}</GridItemText>
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
            label={comments}
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />
          <ProjectCommentsModal projectId={id} />
        </RACDialogTrigger>
      }
      statusSlot={
        <ItemBaseBadge color={getProjectStatusBadgeColor(status.id)}>
          {status.name}
        </ItemBaseBadge>
      }
      progressSlot={
        <GridItemProgress
          value={(tasksDone / tasks) * 100}
          showValueText={false}
          aria-label="project progress"
        />
      }
    />
  );
}
