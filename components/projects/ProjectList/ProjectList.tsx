"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { ProjectListItemSkeleton } from "../ProjectListItem";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface ProjectListProps {
  showCheckbox?: boolean;
  children: React.ReactNode;
}

export function ProjectList({ showCheckbox, children }: ProjectListProps) {
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  if (isPaginationPending || isFilteringPending || isSortingPending) {
    return (
      <List data-test="projects-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => (
            <ProjectListItemSkeleton showCheckbox={showCheckbox} />
          )}
        />
      </List>
    );
  }

  return <List data-test="projects-list">{children}</List>;
}
