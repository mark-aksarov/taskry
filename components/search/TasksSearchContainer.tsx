"use client";

import { TaskSearchListItem } from "./TaskSearchListItem";
import { TaskSearchItemDTO } from "@/lib/data/task/task.dto";
import { SearchContainer, SearchContainerProps } from "./SearchContainer";

type TasksSearchContainerProps = Omit<
  SearchContainerProps<TaskSearchItemDTO>,
  "endpoint" | "renderItem"
>;

export function TasksSearchContainer(props: TasksSearchContainerProps) {
  return (
    <SearchContainer
      endpoint="/api/tasks/search"
      renderItem={(item: TaskSearchItemDTO) => (
        <TaskSearchListItem
          key={item.id}
          id={item.id}
          title={item.title}
          deadline={new Date(item.deadline)}
        />
      )}
      {...props}
    />
  );
}
