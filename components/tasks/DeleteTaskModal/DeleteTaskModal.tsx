"use client";

import { startTransition } from "react";
import { ModalProps } from "@/components/ui/Modal";
import { BaseDeleteTaskModal } from "./BaseDeleteTaskModal";
import { useDeleteTaskContext } from "../DeleteTaskContext";

interface DeleteTaskModalProps extends ModalProps {
  taskId: number;
  taskTitle: string;
}

export function DeleteTaskModal({
  taskId,
  taskTitle,
  isOpen,
  onOpenChange,
}: DeleteTaskModalProps) {
  const { action } = useDeleteTaskContext();

  const handleDelete = () => {
    onOpenChange?.(false);
    startTransition(() => action({ ids: [taskId], shouldRedirect: false }));
  };

  return (
    <BaseDeleteTaskModal
      onDelete={handleDelete}
      taskTitle={taskTitle}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
