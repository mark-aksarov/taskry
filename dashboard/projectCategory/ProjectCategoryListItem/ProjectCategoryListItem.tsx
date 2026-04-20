"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/dashboard/common/ListItem";

import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { SelectableProjectCategoryItem } from "../SelectableProjectCategoryItem";
import { ProjectCategoryListItemCheckbox } from "./ProjectCategoryListItemCheckbox";
import { useProjectCategoryListItemPending } from "./useProjectCategoryListItemPending";
import { ProjectCategoryListItemActionMenuTrigger } from "./ProjectCategoryListItemActionMenuTrigger";

interface ProjectCategoryListItemProps {
  id: number;
  name: string;
}

export function ProjectCategoryListItem(props: ProjectCategoryListItemProps) {
  const isPending = useProjectCategoryListItemPending(props.id);

  return (
    <SelectableProjectCategoryItem projectCategoryId={props.id}>
      <ProjectCategoryListItemInner {...props} isPending={isPending} />
    </SelectableProjectCategoryItem>
  );
}

type InnerProps = ProjectCategoryListItemProps & {
  isPending: boolean;
};

const ProjectCategoryListItemInner = memo(
  function ProjectCategoryListItemInner({ id, name, isPending }: InnerProps) {
    const t = useTranslations(
      "dashboard.projectCategories.ProjectCategoryListItem",
    );

    return (
      <ListItem
        data-test="project-category-list-item"
        className={twMerge(
          "flex w-full items-center gap-4",
          isPending && "*:opacity-50",
        )}
      >
        <ProjectCategoryListItemCheckbox id={id} />
        <ListItemInfo>
          <ListItemTitle>{name}</ListItemTitle>
          <ListItemText>{t("name")}</ListItemText>
        </ListItemInfo>

        <ProjectCategoryListItemActionMenuTrigger projectCategoryId={id} />
      </ListItem>
    );
  },
);
