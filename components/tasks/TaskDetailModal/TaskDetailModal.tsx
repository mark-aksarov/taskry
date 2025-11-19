"use client";

import { useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { TaskDetailClientContainerContext } from "@/components/tasks/TaskDetailClientContainer";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const TaskDetailClientContainer = useContext(
    TaskDetailClientContainerContext,
  );

  return (
    <DetailModal title="Task Detail">
      <TaskDetailClientContainer taskId={taskId} />
    </DetailModal>
  );
}
