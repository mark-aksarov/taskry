"use client";

import { OverlayTriggerState } from "react-stately";
import { useTaskDetailContainer } from "../TaskDetail";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";

export interface TaskDetailBottomSheetProps {
  taskId: number;
  state: OverlayTriggerState;
}

export function TaskDetailBottomSheet({
  taskId,
  state,
}: TaskDetailBottomSheetProps) {
  const TaskDetailContainer = useTaskDetailContainer();

  return (
    <DetailBottomSheet state={state} title="Task Detail">
      <TaskDetailContainer taskId={taskId} />
    </DetailBottomSheet>
  );
}
