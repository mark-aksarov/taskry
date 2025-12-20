"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List/index";

import {
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { Checkbox } from "@/components/ui";
import { MessageSquare } from "lucide-react";
import { Link, RACDialogTrigger } from "@/components/ui";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { useProjectsSelection } from "../ProjectsSelectionContext";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectDetailBottomSheet } from "../ProjectDetailBottomSheet";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";

export interface ProjectListItemProps {
  id: number;
  title: string;
  deadline?: Date;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  customer?: {
    id: number;
    fullName: string;
    imageUrl?: string;
  };
  category: {
    id: number;
    name: string;
  };
  company?: {
    id: number;
    name: string;
  };
  status: string;
  commentsCount: number;
  showCheckbox?: boolean;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

export const ProjectListItem = ({
  id,
  title,
  deadline,
  category,
  customer,
  company,
  status,
  creator,
  commentsCount,
  showCheckbox,
  deleteAction,
  updateStatusAction,
}: ProjectListItemProps) => {
  const t = useTranslations("projects");
  const { selectedIds, toggleSelection } = useProjectsSelection();

  const format = useFormatter();

  const deadlineOn = deadline
    ? t("ProjectListItem.deadlineOn", {
        date: format.dateTime(deadline, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      })
    : t("ProjectListItem.noDeadline");

  const creatorImg = creator?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={creator.imageUrl} alt={creator.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  const isSelected = !!selectedIds[id];

  return (
    <ProjectListItemLayout
      checkboxSlot={
        showCheckbox && (
          <Checkbox
            aria-label="project checkbox"
            isSelected={isSelected}
            onChange={() => toggleSelection(id)}
          />
        )
      }
      titleSlot={
        <ListItemInfo>
          <ListItemTitle>
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
          </ListItemTitle>
          <ListItemText>{deadlineOn}</ListItemText>
        </ListItemInfo>
      }
      creatorSlot={
        <>
          {creator ? (
            <ItemBaseDetailModalTrigger
              modal={<UserDetailModal userId={creator.id} />}
              className="@max-2xl:hidden"
            >
              {creatorImg}
            </ItemBaseDetailModalTrigger>
          ) : (
            <UnknownUser className="h-9 w-9 @max-2xl:hidden" />
          )}

          <ListItemInfo className="@max-2xl:hidden">
            <ListItemTitle>
              {creator ? (
                <ItemBaseDetailModalTrigger
                  modal={<UserDetailModal userId={creator.id} />}
                  className="truncate"
                >
                  {creator.fullName}
                </ItemBaseDetailModalTrigger>
              ) : (
                t("ProjectListItem.unknownCreator")
              )}
            </ListItemTitle>
            <ListItemText>{t("ProjectListItem.creator")}</ListItemText>
          </ListItemInfo>
        </>
      }
      customerSlot={
        <>
          {customer?.imageUrl ? (
            <ImageContainer className="h-9 w-9 @max-3xl:hidden">
              <Image fill src={customer.imageUrl} alt={customer.fullName} />
            </ImageContainer>
          ) : (
            <UnknownUser className="h-9 w-9 @max-3xl:hidden" />
          )}

          <ListItemInfo className="@max-3xl:hidden">
            <ListItemTitle>
              {customer ? (
                <Link
                  className="block truncate"
                  href={`/customers=${customer.id}`}
                >
                  {customer.fullName}
                </Link>
              ) : (
                t("ProjectListItem.unknownCustomer")
              )}
            </ListItemTitle>

            <ListItemText>{t("ProjectListItem.customer")}</ListItemText>
          </ListItemInfo>
        </>
      }
      categorySlot={
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>{category.name}</ListItemTitle>

          <ListItemText>{t("ProjectListItem.category")}</ListItemText>
        </ListItemInfo>
      }
      companySlot={
        <ListItemInfo className="@max-5xl:hidden">
          <ListItemTitle>
            {company ? company.name : t("ProjectListItem.unknownCompany")}
          </ListItemTitle>

          <ListItemText>{t("ProjectListItem.company")}</ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <ItemBaseBadge
          className="@max-lg:hidden"
          color={getProjectStatusBadgeColor(status)}
        >
          {t(`ProjectStatus.${status}`)}
        </ItemBaseBadge>
      }
      commentsModalTriggerSlot={
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
      menuTriggerSlot={
        <ProjectItemActionMenuTrigger
          projectId={id}
          projectTitle={title}
          projectStatus={status}
          deleteAction={deleteAction}
          updateStatusAction={updateStatusAction}
        />
      }
    />
  );
};
