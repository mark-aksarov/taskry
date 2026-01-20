"use client";

import {
  useProjectSelection,
  useSyncSelectionProjectItem,
} from "@/lib/hooks/useProjectSelection";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List/index";

import {
  ItemBaseBadge,
  ItemBaseDetailModalTrigger,
  ItemBaseDetailBottomSheetTrigger,
} from "@/components/common/ItemBase";

import Image from "next/image";
import { Link } from "@/components/ui";
import { Checkbox } from "@/components/ui";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectDetailBottomSheet } from "../ProjectDetailBottomSheet";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";

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
  status: ProjectStatus;
  showCheckbox?: boolean;
  commentModalTrigger: React.ReactNode;
  menuTrigger: React.ReactNode;
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
  showCheckbox,
  commentModalTrigger,
  menuTrigger,
}: ProjectListItemProps) => {
  const t = useTranslations("projects");

  const { isSelected, toggleItem } = useProjectSelection();
  useSyncSelectionProjectItem(id, title);

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

  return (
    <ProjectListItemLayout
      checkboxSlot={
        showCheckbox && (
          <Checkbox
            data-test={`project-${id}-checkbox`}
            aria-label="project checkbox"
            isSelected={isSelected(id)}
            onChange={() => toggleItem(id)}
          />
        )
      }
      titleSlot={
        <ListItemInfo>
          <ListItemTitle data-test="project-list-item-title">
            <ItemBaseDetailModalTrigger
              data-test="project-list-item-title-trigger"
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
              data-test="project-list-item-creator-image-trigger"
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
                  data-test="project-list-item-creator-name-trigger"
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
      commentsModalTriggerSlot={commentModalTrigger}
      menuTriggerSlot={menuTrigger}
    />
  );
};
