"use client";

import { startTransition } from "react";
import { useDeleteTask } from "./DeleteTaskContext";
import { BaseDeleteTaskModal } from "./BaseDeleteTaskModal";
import { useModal } from "@/common/ModalManagerContext";

interface DeleteTaskModalProps {
  taskId: number;
  taskTitle: string;
}

export function DeleteTaskDetailModal({
  taskId,
  taskTitle,
}: DeleteTaskModalProps) {
  const { action } = useDeleteTask();
  const { isOpen, onOpenChange } = useModal("deleteTask");

  // Close modal and delete task
  // We should redirect to the task list page after deletion
  function handleDelete() {
    onOpenChange(false);
    startTransition(() => action({ id: taskId, shouldRedirect: true }));
  }

  return (
    <BaseDeleteTaskModal
      onDelete={handleDelete}
      taskTitle={taskTitle}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
