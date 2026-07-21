"use client";

import { startTransition } from "react";
import { Item, Key } from "react-stately";
import { ButtonVariant } from "@/ui/Button";
import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { ActionsButton } from "../common/ActionsButton";
import { useModal } from "../../common/ModalManagerContext";
import { useSelectedTasks } from "./SelectedTasksContext";
import { ActionsMenuTrigger } from "../common/ActionsMenuTrigger";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useUpdateTaskStatuses } from "./UpdateTaskStatusesContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface TaskActionsMenuTriggerProps {
  // Extra flag to hide the label on User/Profile Tasks pages
  showLabel?: boolean;
  buttonVariant?: ButtonVariant;
}

export const TaskActionsMenuTrigger = ({
  showLabel,
  buttonVariant,
}: TaskActionsMenuTriggerProps) => {
  const t = useTranslations("dashboard.tasks.TaskActionsMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteTasks");

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
    guestGuard(() => {
      if (key === "delete") {
        onDeleteModalOpenChange(true);
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
    });
  };

  // disable menu items if selected tasks have the same status.
  const disabledKeys = Object.values(TaskStatus).filter((status) =>
    selected.items.every((task) => task.status === status),
  );

  return (
    <ActionsMenuTrigger
      onAction={handleAction}
      disabledKeys={disabledKeys}
      renderDialogHeader={() => (
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
      )}
      renderButton={() => (
        <ActionsButton
          showLabel={showLabel}
          data-test="task-actions-menu-trigger"
          selectedIds={selected.ids}
          variant={buttonVariant}
        />
      )}
    >
      <Item textValue={t("delete")} key="delete">
        <Trash    />
        {t("delete")}
      </Item>
      <Item textValue={t("pending")} key="pending">
        <CircleEllipsis    />
        {t("pending")}
      </Item>
      <Item textValue={t("active")} key="active">
        <Check    />
        {t("active")}
      </Item>
      <Item textValue={t("completed")} key="completed">
        <Clock    />
        {t("completed")}
      </Item>
    </ActionsMenuTrigger>
  );
};
