"use client";

import { TaskGridItem } from "../TaskGridItem";
import { TaskPreview } from "@/lib/queries/types";
import { Grid } from "@/components/common/Grid/Grid";
import { useViewMode } from "@/components/common/ViewMode";

export function TaskGrid({ tasks }: { tasks: TaskPreview[] }) {
  const { viewMode } = useViewMode();

  if (viewMode !== "grid") return null;

  return (
    <Grid>
      {tasks.map((task) => (
        <TaskGridItem key={task.id} task={task} />
      ))}
    </Grid>
  );
}
