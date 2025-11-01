import { useMemo } from "react";
import { TaskDetailInner } from "./TaskDetailInner";
import { taskDetailMock } from "@/lib/data/__mocks__/tasks";

export function TaskDetail({ taskId }: { taskId: number }) {
  const task = taskDetailMock;

  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!task?.deadline) return "";
    return new Date(task.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [task?.deadline, locale]);

  return <TaskDetailInner task={task} formattedDeadline={formattedDeadline} />;
}
