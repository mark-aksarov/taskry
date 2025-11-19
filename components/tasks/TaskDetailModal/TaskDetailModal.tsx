"use client";

import { Suspense, useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { TaskDetailSkeleton } from "../TaskDetail/TaskDetailSkeleton";
import { TaskDetailClientContainerContext } from "@/components/tasks/TaskDetailClientContainer";

export function TaskDetailModal({ taskId }: { taskId: number }) {
  const TaskDetailClientContainer = useContext(
    TaskDetailClientContainerContext,
  );

  return (
    <DetailModal title="Task Detail">
      <Suspense fallback={<TaskDetailSkeleton />}>
        <TaskDetailClientContainer taskId={taskId} />
      </Suspense>
    </DetailModal>
  );
}
