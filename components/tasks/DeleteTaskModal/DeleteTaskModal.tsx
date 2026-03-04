"use client";

import { startTransition } from "react";
import { useDeleteTask } from "../DeleteTaskContext";
import { useSelectedTasks } from "../SelectedTasksContext";
import { BaseDeleteTaskModal } from "./BaseDeleteTaskModal";

interface DeleteTaskModalProps {
  taskId: number;
  taskTitle: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function DeleteTaskModal({
  taskId,
  taskTitle,
  isOpen,
  onOpenChange,
}: DeleteTaskModalProps) {
  const { action } = useDeleteTask();

  const { remove: removeSelected } = useSelectedTasks();

  function handleDelete() {
    const payload = {
      id: taskId,
      shouldRedirect: false,
    };

    //Remove the entity from the selection to prevent access to it
    removeSelected(taskId);

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(payload));
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
