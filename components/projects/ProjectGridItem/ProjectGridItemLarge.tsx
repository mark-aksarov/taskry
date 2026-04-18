"use client";

import {
  BaseProjectItemProps,
  useProjectItemPending,
  ProjectItemActionMenuTrigger,
} from "../ProjectItem";

import {
  GridItemText,
  GridItemInfo,
  GridItemTitleButton,
} from "@/components/common/Grid";

import {
  ItemBaseDeadline,
  ItemBaseDetailButton,
  ItemBaseCommentsButton,
  ItemBaseUserImageContainer,
} from "@/components/common/ItemBase";

import { memo } from "react";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { SelectableProjectItem } from "../SelectableProjectItem";
import { ProjectItemStatusBadge } from "../ProjectItemStatusBadge";
import { useModal } from "@/components/common/ModalManagerContext";
import { ProjectGridItemProgress } from "./ProjectGridItemProgress";
import { ProjectItemCheckbox } from "../ProjectItem/ProjectItemCheckbox";

interface Props extends BaseProjectItemProps {
  tasksTotal: number;
  tasksCompleted: number;
}

export function ProjectGridItemLarge(props: Props) {
  const isPending = useProjectItemPending(props.id);

  return (
    <SelectableProjectItem projectId={props.id} projectStatus={props.status}>
      <ProjectGridItemLargeInner {...props} isPending={isPending} />
    </SelectableProjectItem>
  );
}

type InnerProps = Props & {
  isPending: boolean;
};

export const ProjectGridItemLargeInner = memo(
  function ProjectGridItemLargeInner({
    id,
    isPending,
    title,
    deadline,
    creator,
    commentsCount,
    status,
    tasksTotal,
    tasksCompleted,
  }: InnerProps) {
    const { onOpenChange: onProjectDetailModalOpenChange } =
      useModal("projectDetail");
    const { onOpenChange: onUserDetailModalOpenChange } =
      useModal("userDetail");
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

    return (
      <ProjectGridItemLayout
        className={isPending ? "*:opacity-50" : undefined}
        checkboxSlot={<ProjectItemCheckbox id={id} status={status} />}
        menuTriggerSlot={
          <ProjectItemActionMenuTrigger
            projectId={id}
            projectStatus={status}
            className="-mr-2"
          />
        }
        mainSlot={
          <GridItemInfo className="flex-auto">
            <GridItemTitleButton
              onPress={() => onProjectDetailModalOpenChange(true)}
            >
              {title}
            </GridItemTitleButton>

            <GridItemText>
              <ItemBaseDeadline deadline={deadline} />
            </GridItemText>
          </GridItemInfo>
        }
        creatorImageSlot={
          creator ? (
            <ItemBaseDetailButton
              aria-label={creator.fullName}
              onPress={() => onUserDetailModalOpenChange(true)}
            >
              {creatorImg}
            </ItemBaseDetailButton>
          ) : (
            creatorImg
          )
        }
        commentsSlot={
          <ItemBaseCommentsButton
            commentsCount={commentsCount}
            onPress={() => onProjectCommentsModalOpenChange(true)}
          />
        }
        statusSlot={
          <ProjectItemStatusBadge
            projectId={id}
            deadline={deadline}
            status={status}
          />
        }
        progressSlot={
          <ProjectGridItemProgress
            tasksTotal={tasksTotal}
            tasksCompleted={tasksCompleted}
          />
        }
      />
    );
  },
);
