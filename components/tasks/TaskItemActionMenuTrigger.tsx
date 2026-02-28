"use client";

import {
  Info,
  Check,
  Clock,
  Trash,
  Pencil,
  CircleEllipsis,
} from "lucide-react";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditTaskModal } from "./EditTaskModal";
import { startTransition, useState } from "react";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { useDeleteTaskContext } from "./DeleteTaskContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useUpdateTaskStatusContext } from "./UpdateTaskStatusContext";
import { useCurrentUser } from "../common/CurrentUserContext";

export type TaskItemActionMenuTriggerProps = {
  taskId: number;
  taskTitle: string;
  taskStatus: TaskStatus;
  className?: string;
  editTaskFormContainer: React.ReactNode;
};

export function TaskItemActionMenuTrigger({
  taskId,
  taskTitle,
  taskStatus,
  className,
  editTaskFormContainer,
}: TaskItemActionMenuTriggerProps) {
  const t = useTranslations("tasks.TaskItemActionMenuTrigger");

  // Deleting the customer
  const { isPending: isDeletePending } = useDeleteTaskContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // State and action handler for updating task status
  const {
    action: updateTaskStatusAction,
    isPending: isUpdateTaskStatusPending,
  } = useUpdateTaskStatusContext();

  // Handle menu actions
  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();

    if (action === "details") {
      return;
    }

    if (action === "edit") {
      setIsOpenEditModal(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      startTransition(() => {
        updateTaskStatusAction({
          ids: [taskId],
          nextStatus: action as TaskStatus,
        });
      });
    }
  }

  const disabledKeys = isUpdateTaskStatusPending
    ? ["pending", "active", "completed"]
    : [taskStatus];

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className={className}
            isPending={isDeletePending}
            data-test="task-item-action-menu-trigger"
            data-id={taskId}
          />
        )}
      >
        <Item href={`/tasks/${taskId}`} textValue={t("details")} key="details">
          <Info size={16} /> {t("details")}
        </Item>
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
        <Item textValue={t("markPending")} key="pending">
          <CircleEllipsis size={16} /> {t("markPending")}
        </Item>
        <Item textValue={t("markCompleted")} key="completed">
          <Check size={16} /> {t("markCompleted")}
        </Item>
        <Item textValue={t("markActive")} key="active">
          <Clock size={16} /> {t("markActive")}
        </Item>
      </ItemBaseActionMenuTrigger>

      {/* Modal for editing task details */}
      <EditTaskModal
        isOpen={isOpenEditModal}
        onOpenChange={setIsOpenEditModal}
        editTaskFormContainer={editTaskFormContainer}
      />

      <DeleteTaskModal
        taskId={taskId}
        taskTitle={taskTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
