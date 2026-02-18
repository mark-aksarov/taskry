"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { KeyRound, Trash } from "lucide-react";
import { EditTaskModal } from "../EditTaskModal";
import { DeleteTaskModal } from "../DeleteTaskModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { DetailActionsCommentsModalTrigger } from "@/components/common/DetailActionsCommentsModalTrigger";

interface TaskDetailActionsProps {
  guestMode: boolean;
  taskId: number;
  taskTitle: string;
  commentsModal: React.ReactNode;
  deleteTask: ActionFn<ActionState, number[]>;
  editTaskFormContainer: React.ReactNode;
}

export function TaskDetailActions({
  guestMode,
  taskId,
  taskTitle,
  commentsModal,
  deleteTask,
  editTaskFormContainer,
}: TaskDetailActionsProps) {
  const t = useTranslations("tasks.TaskDetailActions");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the task
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleDeletePress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsDeleteModalOpen(true);
  }

  function handleEditPress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsEditModalOpen(true);
  }

  return (
    <>
      <div data-test="task-detail-actions" className="flex flex-col gap-2.5">
        <NavigationButton
          data-test="delete-task-button"
          onPress={handleDeletePress}
          variant="secondary"
        >
          <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </NavigationButton>
        <NavigationButton
          data-test="edit-task-button"
          onPress={handleEditPress}
          variant="secondary"
        >
          <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("edit")}
        </NavigationButton>
        <DetailActionsCommentsModalTrigger modal={commentsModal}>
          {t("comments")}
        </DetailActionsCommentsModalTrigger>
      </div>

      {/* Modal for editing task details */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editTaskFormContainer={editTaskFormContainer}
      />

      {/* Modal for confirming task deletion */}
      <DeleteTaskModal
        taskId={taskId}
        taskTitle={taskTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteTask={deleteTask}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
