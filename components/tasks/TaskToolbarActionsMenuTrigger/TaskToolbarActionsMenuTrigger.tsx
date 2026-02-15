"use client";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../../common/Toolbar";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../../ui/Dialog";
import { TaskStatus } from "@/generated/prisma/enums";
import { DeleteTasksModal } from "../DeleteTasksModal";
import { useSelectedTasks } from "../SelectedTasksContext";
import { GuestModeModal } from "../../common/GuestModeModal";
import { startTransition, useActionState, useState } from "react";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

interface TaskToolbarActionsMenuTriggerProps {
  guestMode: boolean;
  deleteAction: ActionFn<ActionState, DeleteTasksPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

const initialState: ActionState = {
  status: null,
};

export const TaskToolbarActionsMenuTrigger = ({
  guestMode,
  deleteAction,
  updateStatusAction,
}: TaskToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State and handlers for updating task status
  const [updateTaskStatusState, updateTaskStatusAction] = useActionState(
    updateStatusAction,
    initialState,
  );

  // Selected with checkbox tasks
  const selected = useSelectedTasks();

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
      updateTaskStatusAction({ ids: selected.ids, nextStatus });
    });
  };

  // Show toast if updating status fails
  useActionErrorToast(updateTaskStatusState);

  // disable menu items if selected tasks have the same status.
  const disabledKeys = Object.values(TaskStatus).filter((status) =>
    selected.items.every((task) => task.status === status),
  );

  // disable menu trigger if no tasks are selected
  const isDisabled = selected.items.length === 0;

  return (
    <>
      <ToolbarMenuTrigger
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
      </ToolbarMenuTrigger>

      {/* Modal for confirming task deletion */}
      <DeleteTasksModal
        taskIds={selected.ids}
        deleteAction={deleteAction}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onSuccess={selected.clear}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
