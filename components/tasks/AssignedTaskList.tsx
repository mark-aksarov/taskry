"use client";

import { Children } from "react";
import { List } from "../common/List";
import { Repeat } from "../common/Repeat";
import { TaskListItemSkeleton } from "./TaskListItem";
import { usePageTransition } from "../common/PageTransitionContext";

export function AssignedTaskList({ children }: { children: React.ReactNode }) {
  const { isPaginationPending } = usePageTransition();

  if (isPaginationPending) {
    return (
      <List data-test="tasks-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <TaskListItemSkeleton showCheckbox={false} />}
        />
      </List>
    );
  }

  return <List data-test="tasks-list">{children}</List>;
}
