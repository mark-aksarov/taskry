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

import { memo } from "react";
import Image from "next/image";
import { Link } from "@/components/ui/Link";
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
        <Image fill src={creator.imageUrl} alt={creator.fullName} />
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
        titleSlot={
          <ListItemInfo>
            <ListItemTitle data-test="project-list-item-title">
              <ItemBaseDetailModalTrigger
                data-test="project-list-item-title-trigger"
                modal={
                  <ProjectDetailModal
                    projectId={id}
                    projectDetailContainer={projectDetailContainer}
                  />
                }
                className="truncate max-md:hidden"
              >
                {title}
              </ItemBaseDetailModalTrigger>

              <Link
                className="block truncate md:hidden"
                href={`/projects/${id}`}
              >
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
                      modal={
                        <CustomerDetailModal
                          customerId={customer.id}
                          customerDetailContainer={customerDetailContainer}
                        />
                      }
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
