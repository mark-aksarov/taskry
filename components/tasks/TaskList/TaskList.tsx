"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "../TaskListItem";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface TaskListProps {
  showCheckbox?: boolean;
  children: React.ReactNode;
}

export function TaskList({ showCheckbox, children }: TaskListProps) {
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  if (isPaginationPending || isFilteringPending || isSortingPending) {
    return (
      <List data-test="tasks-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => (
            <TaskListItemSkeleton showCheckbox={showCheckbox} />
          )}
        />
      </List>
    );
  }

  return <List data-test="tasks-list">{children}</List>;
}
