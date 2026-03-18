"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { TaskListSkeleton } from "./TaskListSkeleton";
import { useViewMode } from "@/components/common/ViewMode";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface TaskListProps {
  children: React.ReactNode;
}

export function TaskList({ children }: TaskListProps) {
  const { isPending: isViewModePending } = useViewMode();
  const { isPending: isPageTransitionPending } = usePageTransition();

  if (isViewModePending || isPageTransitionPending) {
    return (
      <TaskListSkeleton items={Children.count(children)} showCheckbox={true} />
    );
  }

  return <List data-test="tasks-list">{children}</List>;
}
