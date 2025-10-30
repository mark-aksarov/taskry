import { use, useMemo } from "react";
import { TaskDetail } from "@/lib/queries/types";
import { TaskInfoInner } from "./TaskInfoInner";

export function TaskInfo({
  taskPromise,
}: {
  taskPromise: Promise<TaskDetail>;
}) {
  const task = use(taskPromise);

  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!task?.deadline) return "";
    return new Date(task.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [task?.deadline, locale]);

  return <TaskInfoInner task={task} formattedDeadline={formattedDeadline} />;
}
