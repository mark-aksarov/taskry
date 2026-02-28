"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SelectableItem } from "@/components/common/SelectableItem";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { ProjectCategoryListItemCheckbox } from "./ProjectCategoryListItemCheckbox";
import { ProjectCategoryListItemPendingOverlay } from "./ProjectCategoryListItemPendingOverlay";
import { DeleteProjectCategoryTransitionProvider } from "../DeleteProjectCategoryTransitionContext";
import { UpdateProjectCategoryTransitionProvider } from "../UpdateProjectCategoryTransitionContext";
import { ProjectCategoryListItemActionMenuTrigger } from "./ProjectCategoryListItemActionMenuTrigger";

interface ProjectCategoryListItemProps {
  id: number;
  name: string;
  updateProjectCategory: ActionFn<ActionState, FormData>;
  deleteProjectCategory: ActionFn<ActionState, number[]>;
}

export function ProjectCategoryListItem(props: ProjectCategoryListItemProps) {
  const selected = useSelectedItems();

  return (
    <UpdateProjectCategoryTransitionProvider>
      <DeleteProjectCategoryTransitionProvider>
        <ProjectCategoryListItemPendingOverlay projectCategoryId={props.id}>
          <SelectableItem {...selected} item={{ id: props.id }}>
            <ProjectCategoryListItemInner {...props} />
          </SelectableItem>
        </ProjectCategoryListItemPendingOverlay>
      </DeleteProjectCategoryTransitionProvider>
    </UpdateProjectCategoryTransitionProvider>
  );
}

const ProjectCategoryListItemInner = memo(
  ({
    id,
    name,
    updateProjectCategory,
    deleteProjectCategory,
  }: ProjectCategoryListItemProps) => {
    const t = useTranslations("projectCategories.ProjectCategoryListItem");

    return (
      <ListItem
        data-test="project-category-list-item"
        className="flex w-full items-center gap-4"
      >
        <ProjectCategoryListItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <ProjectCategoryListItemActionMenuTrigger
          projectCategoryId={id}
          projectCategoryName={name}
          updateProjectCategory={updateProjectCategory}
          deleteProjectCategory={deleteProjectCategory}
        />
      </ListItem>
    );
  },
);
