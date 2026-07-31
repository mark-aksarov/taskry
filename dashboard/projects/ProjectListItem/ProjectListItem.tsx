"use client";

import {
  BaseProjectItemProps,
  useProjectItemPending,
  ProjectItemActionMenuTrigger,
} from "../ProjectItem";

import {
  ListItemText,
  ListItemTitle,
  ListItemTitleButton,
} from "@/dashboard/common/ListItem";

import {
  ItemBaseDeadline,
  ItemBaseDetailButton,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/dashboard/common/ItemBase";

import { memo } from "react";
import { isPast } from "date-fns";
import { useTranslations } from "next-intl";
import { ProjectItemCheckbox } from "../ProjectItem";
import { useModal } from "@/common/ModalManagerContext";
import { OverdueBadge } from "@/dashboard/common/OverdueBadge";
import { ListItemGate } from "@/dashboard/common/ListItemGate";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { SelectableProjectItem } from "../SelectableProjectItem";
import { ProjectItemStatusBadge } from "../ProjectItemStatusBadge";
import { ProjectListItemSkeleton } from "./ProjectListItemSkeleton";

export interface Props extends BaseProjectItemProps {
  category?: {
    id: number;
    name: string;
  };
  client?: {
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
  const isPending = useProjectItemPending(props.id);

  return (
    <ListItemGate skeleton={<ProjectListItemSkeleton />}>
      <SelectableProjectItem projectId={props.id} projectStatus={props.status}>
        <ProjectListItemInner {...props} isPending={isPending} />
      </SelectableProjectItem>
    </ListItemGate>
  );
}

type InnerProps = Props & {
  isPending: boolean;
};

export const ProjectListItemInner = memo(function ProjectListItemInner({
  id,
  isPending,
  title,
  deadline,
  category,
  client,
  company,
  commentsCount,
  status,
  creator,
}: InnerProps) {
  const t = useTranslations("dashboard.projects.ProjectListItem");

  const { onOpenChange: onProjectDetailModalOpenChange } =
    useModal("projectDetail");
  const { onOpenChange: onUserDetailModalOpenChange } = useModal("userDetail");
  const { onOpenChange: onClientDetailModalOpenChange } =
    useModal("clientDetail");
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

  const clientImg = (
    <ItemBaseUserImageContainer
      user={client}
      className="h-9 w-9"
      width={36}
      height={36}
    />
  );

  const deadlineDate = new Date(deadline);

  return (
    <ProjectListItemLayout
      data-id={id}
      className={isPending ? "*:opacity-50" : undefined}
      checkboxSlot={
        <ProjectItemCheckbox id={id} title={title} status={status} />
      }
      mainSlot={
        <>
          <ListItemTitleButton
            onPress={() => onProjectDetailModalOpenChange(true)}
          >
            {title}
          </ListItemTitleButton>
          {isPast(deadlineDate) ? (
            <OverdueBadge deadline={deadlineDate} />
          ) : (
            <ListItemText>
              <ItemBaseDeadline deadline={deadlineDate} />
            </ListItemText>
          )}
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
      clientImgSlot={
        <>
          {client ? (
            <ItemBaseDetailButton
              onPress={() => onClientDetailModalOpenChange(true)}
            >
              {clientImg}
            </ItemBaseDetailButton>
          ) : (
            clientImg
          )}
        </>
      }
      clientSlot={
        <>
          {client ? (
            <ListItemTitleButton
              onPress={() => onClientDetailModalOpenChange(true)}
            >
              {client.fullName}
            </ListItemTitleButton>
          ) : (
            <ListItemTitle>{t("noClient")} </ListItemTitle>
          )}

          <ListItemText>{t("client")}</ListItemText>
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
        <ProjectItemStatusBadge
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
  );
});
