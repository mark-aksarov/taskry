"use client";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List/index";

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
import { ProjectItemCheckbox } from "../ProjectItemCheckbox";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";

export interface ProjectListItemProps {
  id: number;
  title: string;
  deadline: Date;
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
  userDetailModal?: React.ReactNode;
  customerDetailModal?: React.ReactNode;
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

export const ProjectListItem = ({
  updateProjectStatus,
  ...props
}: ProjectListItemProps) => {
  const selected = useSelectedProjects();

  return (
    <UpdateProjectStatusProvider updateStatus={updateProjectStatus}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <ProjectListItemInner {...props} />
      </SelectableItem>
    </UpdateProjectStatusProvider>
  );
};

export const ProjectListItemInner = ({
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
  userDetailModal,
  customerDetailModal,
}: Omit<ProjectListItemProps, "updateProjectStatus">) => {
  const t = useTranslations("projects.ProjectListItem");

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
    <ProjectListItemLayout
      id={id}
      checkboxSlot={
        showCheckbox && <ProjectItemCheckbox id={id} status={status} />
      }
      titleSlot={
        <ListItemInfo>
          <ListItemTitle data-test="project-list-item-title">
            <ItemBaseDetailModalTrigger
              data-test="project-list-item-title-trigger"
              modal={projectDetailModal}
              className="truncate max-md:hidden"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <Link className="block truncate md:hidden" href={`/projects/${id}`}>
              {title}
            </Link>
          </ListItemTitle>
          <ListItemText>{deadlineOn}</ListItemText>
        </ListItemInfo>
      }
      creatorSlot={
        <>
          {creator ? (
            <>
              <ItemBaseDetailModalTrigger
                data-test="project-list-item-creator-image-trigger"
                modal={userDetailModal}
                className="max-md:hidden"
              >
                {creatorImg}
              </ItemBaseDetailModalTrigger>
            </>
          ) : (
            <UnknownUser className="h-9 w-9 max-md:hidden" />
          )}

          <ListItemInfo className="max-md:hidden">
            <ListItemTitle>
              {creator ? (
                <>
                  <ItemBaseDetailModalTrigger
                    data-test="project-list-item-creator-name-trigger"
                    modal={userDetailModal}
                    className="truncate"
                  >
                    {creator.fullName}
                  </ItemBaseDetailModalTrigger>
                </>
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
            <ImageContainer className="h-9 w-9 max-md:hidden">
              <Image fill src={customer.imageUrl} alt={customer.fullName} />
            </ImageContainer>
          ) : (
            <UnknownUser className="h-9 w-9 max-md:hidden" />
          )}

          <ListItemInfo className="max-md:hidden">
            <ListItemTitle>
              {customer ? (
                <>
                  <ItemBaseDetailModalTrigger
                    data-test="project-list-item-customer-modal-trigger"
                    modal={customerDetailModal}
                    className="truncate"
                  >
                    {customer.fullName}
                  </ItemBaseDetailModalTrigger>
                </>
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
        <ProjectItemBaseBadge
          projectId={id}
          className="@max-lg:hidden"
          status={status}
        />
      }
      commentsModalTriggerSlot={
        <ItemBaseCommentsModalTrigger
          data-test={`project-${id}-comments-modal-trigger`}
          commentsCount={commentsCount}
          modal={projectCommentsModal}
        />
      }
      menuTriggerSlot={menuTrigger}
    />
  );
};
