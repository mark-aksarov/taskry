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
import { Link } from "@/components/ui/Link";
import { Checkbox } from "@/components/ui/Checkbox";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";
import { ProjectCommentsModalTrigger } from "../ProjectCommentsModalTrigger";

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
  category?: {
    id: number;
    name: string;
  };
  company?: {
    id: number;
    name: string;
  };
  commentsCount: number;
  status: ProjectStatus;
  showCheckbox?: boolean;
  projectCommentsModal: React.ReactNode;
  menuTrigger: React.ReactNode;
  projectDetailModal: React.ReactNode;
  projectDetailBottomSheet: React.ReactNode;
  userDetailModal?: React.ReactNode;
}

export const ProjectListItem = ({
  id,
  title,
  deadline,
  category,
  customer,
  company,
  commentsCount,
  status,
  creator,
  showCheckbox,
  projectCommentsModal,
  menuTrigger,
  projectDetailModal,
  projectDetailBottomSheet,
  userDetailModal,
}: ProjectListItemProps) => {
  const tStatus = useTranslations("projects.ProjectStatus");
  const t = useTranslations("projects.ProjectListItem");

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
    <ProjectListItemLayout
      id={id}
      checkboxSlot={
        showCheckbox && (
          <Checkbox
            data-test="project-checkbox"
            data-id={id}
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
          </ListItemTitle>
          <ListItemText>{deadlineOn}</ListItemText>
        </ListItemInfo>
      }
      creatorSlot={
        <>
          {creator ? (
            <ItemBaseDetailModalTrigger
              data-test="project-list-item-creator-image-trigger"
              modal={userDetailModal}
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
                  modal={userDetailModal}
                  className="truncate"
                >
                  {creator.fullName}
                </ItemBaseDetailModalTrigger>
              ) : (
                t("noCreator")
              )}
            </ListItemTitle>
            <ListItemText>{t("creator")}</ListItemText>
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
                t("noCustomer")
              )}
            </ListItemTitle>

            <ListItemText>{t("customer")}</ListItemText>
          </ListItemInfo>
        </>
      }
      categorySlot={
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>
            {category ? category.name : t("noCategory")}
          </ListItemTitle>

          <ListItemText>{t("category")}</ListItemText>
        </ListItemInfo>
      }
      companySlot={
        <ListItemInfo className="@max-5xl:hidden">
          <ListItemTitle>
            {company ? company.name : t("noCompany")}
          </ListItemTitle>

          <ListItemText>{t("company")}</ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <ItemBaseBadge
          className="@max-lg:hidden"
          color={getProjectStatusBadgeColor(status)}
        >
          {tStatus(`${status}`)}
        </ItemBaseBadge>
      }
      commentsModalTriggerSlot={
        <ProjectCommentsModalTrigger
          data-test={`project-${id}-comments-modal-trigger`}
          commentsCount={commentsCount}
          modal={projectCommentsModal}
        />
      }
      menuTriggerSlot={menuTrigger}
    />
  );
};
