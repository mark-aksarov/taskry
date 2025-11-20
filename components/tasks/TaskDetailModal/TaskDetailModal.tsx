"use client";

import { Suspense, useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact/TaskDetailCompactSkeleton";
import { TaskDetailCompactClientContainerContext } from "@/components/tasks/TaskDetailCompactClientContainer";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const TaskDetailClientContainer = useContext(
    TaskDetailCompactClientContainerContext,
  );

  return (
    <DetailModal title="Task Detail">
      <Suspense fallback={<TaskDetailCompactSkeleton />}>
        <TaskDetailClientContainer taskId={taskId} />
      </Suspense>
    </DetailModal>
  );
}
