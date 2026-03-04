"use client";

import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useUpdateTask } from "../UpdateTaskContext";
import { TaskCommentsModal } from "../TaskCommentsModal";
import { BaseDeleteTaskModal } from "../DeleteTaskModal";
import { startTransition, useActionState, useState } from "react";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { ActionFn, ActionState, DeleteTaskPayload } from "@/lib/actions/types";
import { DetailActionsCommentsModalTrigger } from "@/components/common/DetailActionsCommentsModalTrigger";

const initialDeleteState: ActionState = {
  status: null,
};

interface TaskDetailActionsProps {
  taskId: number;
  taskTitle: string;
  taskCommentsContainer: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  deleteTask: ActionFn<ActionState, DeleteTaskPayload>;
}

export function TaskDetailActions({
  taskId,
  taskTitle,
  taskCommentsContainer,
  sendComment,
  updateComment,
  deleteTask,
}: TaskDetailActionsProps) {
  const t = useTranslations("tasks.TaskDetailActions");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete task: action state + form modal state
  const [, deleteAction, isDeletePending] = useActionState(
    deleteTask,
    initialDeleteState,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit task: action state + form modal state
  const {
    isPending: isUpdatePending,
    onModalOpenChange: onEditModalOpenChange,
  } = useUpdateTask();

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

    onEditModalOpenChange(true);
  }

  // Close modal and delete task
  // We should redirect to the task list page after deletion
  function handleDelete() {
    setIsDeleteModalOpen(false);
    startTransition(() => deleteAction({ id: taskId, shouldRedirect: true }));
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
          isPending={isUpdatePending}
          iconLeft={<Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />}
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
