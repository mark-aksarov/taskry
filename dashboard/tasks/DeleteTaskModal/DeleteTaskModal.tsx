"use client";

import { startTransition } from "react";
import { useDeleteTask } from "../DeleteTaskContext";
import { useSelectedTasks } from "../SelectedTasksContext";
import { BaseDeleteTaskModal } from "../BaseDeleteTaskModal";
import { useModal } from "@/common/ModalManagerContext";

interface DeleteTaskModalProps {
  taskId: number;
  taskTitle: string;
}

export function DeleteTaskModal({ taskId, taskTitle }: DeleteTaskModalProps) {
  const { action } = useDeleteTask();
  const { isOpen, onOpenChange } = useModal("deleteTask");
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
