"use client";

import { Children } from "react";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "../TaskListItem";
import { useEntityPagination } from "@/components/common/EntityContainerPagination";

interface TaskListProps {
  children: React.ReactNode;
}

export function TaskList({ children }: TaskListProps) {
  const { isPending } = useEntityPagination();

  if (isPending) {
    return (
      <List data-test="tasks-list">
        <Repeat
          items={Children.count(children)}
          renderItem={() => <TaskListItemSkeleton />}
        />
      </List>
    );
  }

  return <List data-test="tasks-list">{children}</List>;
}
