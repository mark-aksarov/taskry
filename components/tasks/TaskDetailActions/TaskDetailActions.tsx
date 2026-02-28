"use client";

import { useTranslations } from "next-intl";
import { KeyRound, Trash } from "lucide-react";
import { EditTaskModal } from "../EditTaskModal";
import { startTransition, useState } from "react";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { BaseDeleteTaskModal } from "../DeleteTaskModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";
import { useDeletePageActionState } from "@/lib/hooks/useDeleteEntityPageActionState";
import { DetailActionsCommentsModalTrigger } from "@/components/common/DetailActionsCommentsModalTrigger";

interface TaskDetailActionsProps {
  taskId: number;
  taskTitle: string;
  taskCommentsContainer: React.ReactNode;
  editTaskFormContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, DeleteTasksPayload>;
}

export function TaskDetailActions({
  taskId,
  taskTitle,
  taskCommentsContainer,
  editTaskFormContainer,
  sendComment,
  updateComment,
  deleteTask,
}: TaskDetailActionsProps) {
  const t = useTranslations("tasks.TaskDetailActions");

  // Deleting the task
  const [, action, isDeletePending] = useDeletePageActionState({
    deleteEntity: deleteTask,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function handleDeletePress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsDeleteModalOpen(true);
  }

  function handleEditPress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsEditModalOpen(true);
  }

  function handleDelete() {
    setIsDeleteModalOpen(false);
    startTransition(() => action({ ids: [taskId], shouldRedirect: true }));
  }

  return (
    <>
      <div data-test="task-detail-actions" className="flex flex-col gap-2.5">
        <NavigationButton
          data-test="delete-task-button"
          onPress={handleDeletePress}
          variant="secondary"
          isPending={isDeletePending}
          iconLeft={<Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("delete")}
        />
        <NavigationButton
          data-test="edit-task-button"
          onPress={handleEditPress}
          variant="secondary"
          iconLeft={
            <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
          }
          label={t("edit")}
        />
        <DetailActionsCommentsModalTrigger
          modal={
            <TaskCommentsModal
              taskId={taskId}
              taskCommentsContainer={taskCommentsContainer}
              sendComment={sendComment}
              updateComment={updateComment}
            />
          }
          label={t("comments")}
        />
      </div>

      {/* Modal for editing task details */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editTaskFormContainer={editTaskFormContainer}
      />

      {/* Modal for confirming task deletion */}
      <BaseDeleteTaskModal
        taskTitle={taskTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={handleDelete}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
