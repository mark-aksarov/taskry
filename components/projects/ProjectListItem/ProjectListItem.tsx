"use client";

import {
  BaseProjectItemProps,
  ProjectItemActionMenuTrigger,
  ProjectItemPendingOverlay,
} from "../ProjectItem";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleButton,
} from "@/components/common/List";

import {
  ItemBaseDeadline,
  ItemBaseUserImageContainer,
  ItemBaseDetailButton,
  ItemBaseCommentsButton,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ProjectItemCheckbox } from "../ProjectItem/ProjectItemCheckbox";

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
  showCheckbox?: boolean;
}

export function ProjectListItem(props: Props) {
  const selected = useSelectedProjects();

  return (
    <ProjectItemPendingOverlay projectId={props.id}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <ProjectListItemInner {...props} />
      </SelectableItem>
    </ProjectItemPendingOverlay>
  );
}

export const ProjectListItemInner = memo(function ProjectListItemInner({
  id,
  title,
  deadline,
  category,
  customer,
  company,
  commentsCount,
  status,
  creator,
}: Props) {
  const t = useTranslations("projects.ProjectListItem");

  const { onOpenChange: onProjectDetailModalOpenChange } =
    useModal("projectDetail");
  const { onOpenChange: onUserDetailModalOpenChange } = useModal("userDetail");
  const { onOpenChange: onCustomerDetailModalOpenChange } =
    useModal("customerDetail");
  const { onOpenChange: onProjectCommentsModalOpenChange } =
    useModal("projectComments");

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

  return (
    <>
      <ProjectListItemLayout
        id={id}
        checkboxSlot={<ProjectItemCheckbox id={id} status={status} />}
        mainSlot={
          <>
            <ListItemTitleButton
              onPress={() => onProjectDetailModalOpenChange(true)}
            >
              {title}
            </ListItemTitleButton>
            <ListItemText>
              <ItemBaseDeadline deadline={deadline} />
            </ListItemText>
          </>
        }
        creatorImgSlot={
          <>
            {creator ? (
              <ItemBaseDetailButton
                aria-label={creator.fullName}
                onPress={() => onUserDetailModalOpenChange(true)}
              >
                {creatorImg}
              </ItemBaseDetailButton>
            ) : (
              creatorImg
            )}
          </>
        }
        creatorSlot={
          <>
            {creator ? (
              <ListItemTitleButton
                onPress={() => onUserDetailModalOpenChange(true)}
              >
                {creator.fullName}
              </ListItemTitleButton>
            ) : (
              <ListItemTitle>{t("noCreator")}</ListItemTitle>
            )}

            <ListItemText>{t("creator")}</ListItemText>
          </>
        }
        customerImgSlot={
          <>
            {customer ? (
              <ItemBaseDetailButton
                onPress={() => onCustomerDetailModalOpenChange(true)}
              >
                {customerImg}
              </ItemBaseDetailButton>
            ) : (
              customerImg
            )}
          </>
        }
        customerSlot={
          <>
            {customer ? (
              <ListItemTitleButton
                onPress={() => onCustomerDetailModalOpenChange(true)}
              >
                {customer.fullName}
              </ListItemTitleButton>
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
          <ItemBaseCommentsButton
            data-test="project-comments-modal-trigger"
            data-id={id.toString()}
            commentsCount={commentsCount}
            onPress={() => onProjectCommentsModalOpenChange(true)}
          />
        }
        menuTriggerSlot={
          <ProjectItemActionMenuTrigger projectId={id} projectStatus={status} />
        }
      />
    </>
  );
});
