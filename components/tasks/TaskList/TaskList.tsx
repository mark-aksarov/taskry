"use client";

import { TaskListItem } from "../TaskListItem";
import { TaskPreview } from "@/lib/queries/types";
import { List } from "@/components/common/List";
import { useViewMode } from "@/components/common/ViewMode";

export function TaskList({ tasks }: { tasks: TaskPreview[] }) {
  const { viewMode } = useViewMode();

  if (viewMode !== "list") return null;

  return (
    <List>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} showCheckbox />
      ))}
    </List>
  );
}
