import { use, useMemo } from "react";
import { TaskPreview } from "@/lib/queries/types";
import { TaskDetailsCardInner } from "./TaskDetailsCardInner";

export function TaskDetailsCard({
  taskPromise,
}: {
  taskPromise: Promise<TaskPreview>;
}) {
  const task = use(taskPromise);

  const formattedDeadline = useMemo(() => {
    if (!task?.deadline) return "—";
    try {
      const date = new Date(task.deadline);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  }, [task?.deadline]);

  return (
    <TaskDetailsCardInner task={task} formattedDeadline={formattedDeadline} />
  );
}
