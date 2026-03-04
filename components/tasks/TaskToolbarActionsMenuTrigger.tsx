"use client";

import { startTransition, useState } from "react";
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

export const TaskToolbarActionsMenuTrigger = () => {
  const t = useTranslations("tasks.TaskToolbarActionsMenuTrigger");

  // Detect if the current user is a guest
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Action for updating task statuses
  const { action: updateTaskStatusesAction, setIds: setUpdateTaskStatusesIds } =
    useUpdateTaskStatuses();

  // Selected with checkbox tasks
  const selected = useSelectedTasks();

  /**
   * Handles menu actions for a selected tasks
   * - If user is a guest, show guest modal
   * - Otherwise, open delete confirmation modal based on action key or update task statuses
   */
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      // I store the current ids separately so that checkbox changes
      // during the update process don’t affect status tracking.
      setUpdateTaskStatusesIds(selected.ids);

      startTransition(() => {
        const nextStatus = key as TaskStatus;

        updateTaskStatusesAction({
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
