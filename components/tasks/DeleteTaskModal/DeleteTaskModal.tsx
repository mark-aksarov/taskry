"use client";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { useSelectedTasks } from "../SelectedTasksContext";
import { BaseDeleteTaskModal } from "./BaseDeleteTaskModal";
import { useDeleteTaskTransition } from "../DeleteTaskTransitionContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";

interface DeleteTaskModalProps extends ModalProps {
  taskId: number;
  taskTitle: string;
  deleteTask: ActionFn<ActionState, DeleteTasksPayload>;
}

export function DeleteTaskModal({
  taskId,
  taskTitle,
  deleteTask,
  isOpen,
  onOpenChange,
}: DeleteTaskModalProps) {
  const t = useTranslations("tasks.DeleteTaskModal");

  const { startTransition } = useDeleteTaskTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteTask,
    successMessage: t("successMessage"),
  });

  const { remove: removeSelected } = useSelectedTasks();

  function handleDelete() {
    //Remove the task from the selection to prevent access to it
    removeSelected(taskId);

    //close modal before deleting
    onOpenChange?.(false);
    startTransition(() => action({ ids: [taskId], shouldRedirect: false }));
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
