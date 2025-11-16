"use client";

import { useTaskDetailContainer } from "@/components/tasks/TaskDetail";
import { DetailModal } from "@/components/common/DetailModal";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const TaskDetailContainer = useTaskDetailContainer();

  return (
    <DetailModal>
      <TaskDetailContainer taskId={taskId} />
    </DetailModal>
  );
}
