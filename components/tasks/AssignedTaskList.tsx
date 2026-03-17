"use client";

import { Children } from "react";
import { List } from "../common/List";
import { TaskListSkeleton } from "./TaskList";
import { usePageTransition } from "../common/PageTransitionContext";

export function AssignedTaskList({ children }: { children: React.ReactNode }) {
  const { isPaginationPending } = usePageTransition();

  if (isPaginationPending) {
    return (
      <TaskListSkeleton items={Children.count(children)} showCheckbox={false} />
    );
  }

  return <List data-test="tasks-list">{children}</List>;
}
