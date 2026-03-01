"use client";

import {
  ActionFn,
  ActionState,
  DeleteTasksPayload,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { TaskStatus } from "@/generated/prisma/enums";
import { DeleteTasksModal } from "./DeleteTasksModal";
import { useSelectedTasks } from "./SelectedTasksContext";
import { GuestModeModal } from "../common/GuestModeModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useUpdateTaskStatuses } from "./UpdateTaskStatusesContext";
import { useUpdateEntityStatusActionState } from "@/lib/hooks/useUpdateEntityStatusActionState";

interface TaskToolbarActionsMenuTriggerProps {
  deleteTasks: ActionFn<ActionState, DeleteTasksPayload>;
  updateTaskStatuses: ActionFn<ActionState, UpdateTaskStatusesPayload>;
}

export const TaskToolbarActionsMenuTrigger = ({
  deleteTasks,
  updateTaskStatuses,
}: TaskToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");

  // Guest mode modal state
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Action for updating task statuses
  const [, updateTaskStatusAction] = useUpdateEntityStatusActionState({
    updateEntityStatus: updateTaskStatuses,
  });
  const {
    startTransition: startUpdateTaskStatusesTransition,
    setTaskIds: setUpdateTaskStatusesIds,
  } = useUpdateTaskStatuses();

  // Selected with checkbox tasks
  const selected = useSelectedTasks();

  // Menu actions: show guest modal, show delete modal, update task status
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      setUpdateTaskStatusesIds(selected.ids);

      startUpdateTaskStatusesTransition(() => {
        const nextStatus = key as TaskStatus;

        updateTaskStatusAction({
          ids: selected.ids,
          nextStatus,
        });
      });
    }
  };

  // disable menu items if selected tasks have the same status.
  const disabledKeys = Object.values(TaskStatus).filter((status) =>
    selected.items.every((task) => task.status === status),
  );

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        selectedIds={selected.ids}
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
        taskIds={selected.ids}
        deleteTasks={deleteTasks}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
