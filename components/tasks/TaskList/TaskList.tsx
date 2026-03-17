"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { TaskListSkeleton } from "./TaskListSkeleton";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

interface TaskListProps {
  children: React.ReactNode;
}

export function TaskList({ children }: TaskListProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return (
      <TaskListSkeleton items={Children.count(children)} showCheckbox={true} />
    );
  }

  return <List data-test="tasks-list">{children}</List>;
}
