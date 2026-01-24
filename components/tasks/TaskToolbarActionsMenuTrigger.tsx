"use client";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ToolbarActionsMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../common/Toolbar";

import { DialogHeader } from "../ui";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DeleteTasksModal } from "./DeleteTasksModal";
import { TaskStatus } from "@/generated/prisma/enums";
import { GuestModeModal } from "../common/GuestModeModal";
import { useHasGuestMode } from "@/lib/hooks/useHasGuestMode";
import { useTaskSelection } from "@/lib/hooks/useTaskSelection";
import { startTransition, useActionState, useState } from "react";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

interface TaskToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

const initialState: ActionState = {
  status: null,
  message: null,
};

export const TaskToolbarActionsMenuTrigger = ({
  deleteAction,
  updateStatusAction,
}: TaskToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");

  // Guest mode modal state
  const guestMode = useHasGuestMode();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State and handlers for updating task status
  const [updateTaskStatusState, updateTaskStatusAction] = useActionState(
    updateStatusAction,
    initialState,
  );

  // Menu actions: show guest modal, show delete modal, update task status
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
      return;
    }

    const nextStatus = key as TaskStatus;

    startTransition(() => {
      updateTaskStatusAction({ ids: taskIds, nextStatus });
    });
  };

  // Show toast if updating status fails
  useActionErrorToast(updateTaskStatusState);

  const {
    selectedIds: taskIds,
    clearSelectedIds,
    selectedItems,
  } = useTaskSelection();

  // disable actions when selected tasks have the same status
  const disabledKeys = Object.values(TaskStatus).filter((status) =>
    selectedItems.every((task) => task.status === status),
  );

  const isDisabled = taskIds.length === 0;

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <>
            <ToolbarActionsButtonMobile
              data-test="task-toolbar-actions-button-mobile"
              isDisabled={isDisabled}
            />
            <ToolbarActionsButtonDesktop
              data-test="task-toolbar-actions-button-desktop"
              isDisabled={isDisabled}
            />
          </>
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
        <Item textValue={t("pending")} key="pending">
          <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("pending")}
        </Item>
        <Item textValue={t("active")} key="active">
          <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("active")}
        </Item>
        <Item textValue={t("completed")} key="completed">
          <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("completed")}
        </Item>
      </ToolbarActionsMenuTrigger>

      {/* Modal for confirming task deletion */}
      <DeleteTasksModal
        taskIds={taskIds}
        deleteAction={deleteAction}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onSuccess={clearSelectedIds}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
