"use client";

import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";
import { TaskDetailCompactSkeleton } from "../TaskDetailCompact/TaskDetailCompactSkeleton";
import { TaskDetailCompactClientContainerContext } from "../TaskDetailCompactClientContainer";

export interface TaskDetailBottomSheetProps {
  taskId: number;
  state: OverlayTriggerState;
}

export function TaskDetailBottomSheet({
  taskId,
  state,
}: TaskDetailBottomSheetProps) {
  const TaskDetailClientContainer = useContext(
    TaskDetailCompactClientContainerContext,
  );

  return (
    <DetailBottomSheet state={state} title="Task Detail">
      <Suspense fallback={<TaskDetailCompactSkeleton />}>
        <TaskDetailClientContainer taskId={taskId} />
      </Suspense>
    </DetailBottomSheet>
  );
}
