"use client";

import {
  BaseProjectItemProps,
  ProjectItemProviders,
  ProjectItemActionMenuTrigger,
} from "../ProjectItem";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleDetailModalTrigger,
} from "@/components/common/List";

import {
  ItemBaseDeadline,
  ItemBaseUserImageContainer,
  ItemBaseDetailModalTrigger,
  ItemBaseCommentsModalTrigger,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { UpdateProjectModal } from "../UpdateProjectModal";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { ProjectItemCheckbox } from "../ProjectItem/ProjectItemCheckbox";
import { CustomerDetailModal } from "@/components/customer/CustomerDetailModal";

export interface Props extends BaseProjectItemProps {
  category?: {
    id: number;
    name: string;
  };
  customer?: {
    id: number;
    fullName: string;
    imageUrl?: string;
  };
  company?: {
    id: number;
    name: string;
  };
  projectDetailContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
  userDetailHeaderContainer: React.ReactNode;
  customerDetailContainer: React.ReactNode;
  customerDetailHeaderContainer: React.ReactNode;
  showCheckbox?: boolean;
}

export function ProjectListItem({
  updateProject,
  deleteProject,
  updateProjectStatus,
  ...props
}: Props) {
  const selected = useSelectedProjects();

  return (
    <ProjectItemProviders
      projectId={props.id}
      deleteProject={deleteProject}
      updateProject={updateProject}
      updateProjectStatus={updateProjectStatus}
    >
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <ProjectListItemInner {...props} />
      </SelectableItem>
    </ProjectItemProviders>
  );
}

export type InnerProps = Omit<
  Props,
  "updateProject" | "deleteProject" | "updateProjectStatus"
>;

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
    updateProjectFormContainer,
    projectDetailContainer,
    userDetailContainer,
    userDetailHeaderContainer,
    customerDetailContainer,
    customerDetailHeaderContainer,
    projectCommentsContainer,
    sendComment,
    updateComment,
  }: InnerProps) => {
    const t = useTranslations("projects.ProjectListItem");

    const creatorImg = (
      <ItemBaseUserImageContainer
        user={creator}
        className="h-9 w-9"
        width={36}
        height={36}
      />
    );

    const customerImg = (
      <ItemBaseUserImageContainer
        user={customer}
        className="h-9 w-9"
        width={36}
        height={36}
      />
    );

    const userDetailModal = creator ? (
      <UserDetailModal
        userId={creator.id}
        userDetailContainer={userDetailContainer}
        userDetailHeaderContainer={userDetailHeaderContainer}
      />
    ) : undefined;

    const customerDetailModal = customer ? (
      <CustomerDetailModal
        customerId={customer.id}
        customerDetailContainer={customerDetailContainer}
        customerDetailHeaderContainer={customerDetailHeaderContainer}
      />
    ) : undefined;

    return (
      <>
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
              <ListItemText>
                <ItemBaseDeadline deadline={deadline} />
              </ListItemText>
            </>
          }
          creatorImgSlot={
            <>
              {creator ? (
                <ItemBaseDetailModalTrigger modal={userDetailModal}>
                  {creatorImg}
                </ItemBaseDetailModalTrigger>
              ) : (
                creatorImg
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
              {customer ? (
                <ItemBaseDetailModalTrigger modal={customerDetailModal}>
                  {customerImg}
                </ItemBaseDetailModalTrigger>
              ) : (
                customerImg
              )}
            </>
          }
          customerSlot={
            <>
              {customer ? (
                <ListItemTitleDetailModalTrigger modal={customerDetailModal}>
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
              projectId={id}
              projectTitle={title}
              projectStatus={status}
            />
          }
        />

        {/* Modal for editing project details */}
        <UpdateProjectModal
          updateProjectFormContainer={updateProjectFormContainer}
        />
      </>
    );
  },
);
