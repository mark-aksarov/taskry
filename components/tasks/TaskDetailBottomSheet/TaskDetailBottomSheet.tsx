"use client";

import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { TaskDetailSkeleton } from "../TaskDetail/TaskDetailSkeleton";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";
import { TaskDetailClientContainerContext } from "../TaskDetailClientContainer";

export interface TaskDetailBottomSheetProps {
  taskId: number;
  state: OverlayTriggerState;
}

export function TaskDetailBottomSheet({
  taskId,
  state,
}: TaskDetailBottomSheetProps) {
  const TaskDetailClientContainer = useContext(
    TaskDetailClientContainerContext,
  );

  return (
    <DetailBottomSheet state={state} title="Task Detail">
      <Suspense fallback={<TaskDetailSkeleton />}>
        <TaskDetailClientContainer taskId={taskId} />
      </Suspense>
    </DetailBottomSheet>
  );
}
