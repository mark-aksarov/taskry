"use client";

import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import {
  ActionFn,
  ActionState,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import {
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import { memo } from "react";
import Image from "next/image";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectItemCheckbox } from "../ProjectItemCheckbox";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ImageContainer } from "@/components/common/ImageContainer";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";
import { CustomerDetailModal } from "@/components/customer/CustomerDetailModal";

export interface ProjectListItemProps {
  id: number;
  title: string;
  deadline: string;
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
  guestMode: boolean;
  editProjectFormContainer: React.ReactNode;
  customerDetailContainer?: React.ReactNode;
  projectCommentsContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  userDetailContainer?: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
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

export const ProjectListItemInner = memo(
  ({
    id,
    title,
    deadline,
    category,
    customer,
    company,
    commentsCount,
    status,
    creator,
    guestMode,
    editProjectFormContainer,
    projectDetailContainer,
    userDetailContainer,
    customerDetailContainer,
    projectCommentsContainer,
    sendComment,
    updateComment,
  }: Omit<ProjectListItemProps, "updateProjectStatus">) => {
    const t = useTranslations("projects.ProjectListItem");

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

    const userDetailModal = creator && (
      <UserDetailModal
        userId={creator.id}
        userDetailContainer={userDetailContainer}
      />
    );

    return (
      <ProjectListItemLayout
        id={id}
        checkboxSlot={<ProjectItemCheckbox id={id} status={status} />}
        mainSlot={
          <>
            <ListItemTitleDetailModalTrigger
              data-test="project-list-item-title-trigger"
              modal={
                <ProjectDetailModal
                  projectId={id}
                  projectDetailContainer={projectDetailContainer}
                />
              }
            >
              {title}
            </ListItemTitleDetailModalTrigger>
            <ListItemText>{deadlineOn}</ListItemText>
          </>
        }
        mainMobileSlot={
          <>
            <ListItemTitle>{title}</ListItemTitle>
            <ListItemText>{deadlineOn}</ListItemText>
          </>
        }
        creatorImgSlot={
          <>
            {creator ? (
              <>
                <ItemBaseDetailModalTrigger modal={userDetailModal}>
                  {creatorImg}
                </ItemBaseDetailModalTrigger>
              </>
            ) : (
              <UnknownUser className="h-9 w-9" />
            )}
          </>
        }
        creatorSlot={
          <>
            {creator ? (
              <ListItemTitleDetailModalTrigger modal={userDetailModal}>
                {creator.fullName}
              </ListItemTitleDetailModalTrigger>
            ) : (
              <ListItemTitle>{t("noCreator")}</ListItemTitle>
            )}

            <ListItemText>{t("creator")}</ListItemText>
          </>
        }
        customerImgSlot={
          <>
            {customer?.imageUrl ? (
              <ImageContainer className="h-9 w-9">
                <Image
                  src={customer.imageUrl}
                  alt={customer.fullName}
                  width={36}
                  height={36}
                />
              </ImageContainer>
            ) : (
              <UnknownUser className="h-9 w-9" />
            )}
          </>
        }
        customerSlot={
          <>
            {customer ? (
              <ListItemTitleDetailModalTrigger
                modal={
                  <CustomerDetailModal
                    customerId={customer.id}
                    customerDetailContainer={customerDetailContainer}
                  />
                }
              >
                {customer.fullName}
              </ListItemTitleDetailModalTrigger>
            ) : (
              <ListItemTitle>{t("noCustomer")} </ListItemTitle>
            )}

            <ListItemText>{t("customer")}</ListItemText>
          </>
        }
        categorySlot={
          <>
            <ListItemTitle>
              {category ? category.name : t("noCategory")}
            </ListItemTitle>

            <ListItemText>{t("category")}</ListItemText>
          </>
        }
        companySlot={
          <>
            <ListItemTitle>
              {company ? company.name : t("noCompany")}
            </ListItemTitle>

            <ListItemText>{t("company")}</ListItemText>
          </>
        }
        statusSlot={
          <ProjectItemBaseBadge
            projectId={id}
            deadline={deadline}
            status={status}
          />
        }
        commentsModalTriggerSlot={
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
        menuTriggerSlot={
          <ProjectItemActionMenuTrigger
            guestMode={guestMode}
            projectId={id}
            projectTitle={title}
            projectStatus={status}
            editProjectFormContainer={editProjectFormContainer}
          />
        }
      />
    );
  },
);
