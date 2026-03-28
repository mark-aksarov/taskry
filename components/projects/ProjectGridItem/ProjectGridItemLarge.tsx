"use client";

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

import {
  BaseProjectItemProps,
  ProjectItemPendingOverlay,
  ProjectItemActionMenuTrigger,
} from "../ProjectItem";

import { memo } from "react";
import { ProjectItemBaseBadge } from "../ProjectItemBaseBadge";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ProjectGridItemProgress } from "./ProjectGridItemProgress";
import { ProjectItemCheckbox } from "../ProjectItem/ProjectItemCheckbox";

interface Props extends BaseProjectItemProps {
  tasksTotal: number;
  tasksCompleted: number;
}

export function ProjectGridItemLarge(props: Props) {
  const selected = useSelectedProjects();

  return (
    <ProjectItemPendingOverlay projectId={props.id}>
      <SelectableItem
        {...selected}
        item={{ id: props.id, status: props.status }}
      >
        <ProjectGridItemLargeInner {...props} />
      </SelectableItem>
    </ProjectItemPendingOverlay>
  );
}

export const ProjectGridItemLargeInner = memo(
  ({
    id,
    title,
    deadline,
    creator,
    commentsCount,
    status,
    tasksTotal,
    tasksCompleted,
  }: Props) => {
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
          <ProjectItemBaseBadge
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
