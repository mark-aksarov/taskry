"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "../TaskListItem";
import { useEntityListPending } from "@/lib/hooks/useEntityListPending";

interface TaskListProps {
  children: React.ReactNode;
}

export function TaskList({ children }: TaskListProps) {
  const isPending = useEntityListPending();

  if (isPending) {
    return (
      <List data-test="tasks-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <TaskListItemSkeleton showCheckbox={true} />}
        />
      </List>
    );
  }

  return <List data-test="tasks-list">{children}</List>;
}
