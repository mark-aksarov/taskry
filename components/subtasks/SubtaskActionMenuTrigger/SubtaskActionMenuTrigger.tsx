"use client";

import {
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
  ItemBaseActionMenuButton,
} from "../../common/ItemBase";

import { startTransition } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { CheckCheck, Pencil, Trash } from "lucide-react";
import { useToggleSubtask } from "../ToggleSubtaskContext";
import { useModal } from "@/components/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useSubtaskListItemPending } from "../SubtaskListItem/useSubtaskListItemPending";
import { twMerge } from "tailwind-merge";

interface SubtaskActionMenuTriggerProps {
  subtaskId: number;
  isDone: boolean;
  buttonClassName?: string;
}

export function SubtaskActionMenuTrigger({
  subtaskId,
  isDone,
  buttonClassName,
}: SubtaskActionMenuTriggerProps) {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteSubtask");

  // States for toggling subtask from context
  const { action: toggleSubtaskAction } = useToggleSubtask();

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateSubtask");

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "delete") {
        onDeleteModalOpenChange(true);
      } else if (key === "edit") {
        onUpdateModalOpenChange(true);
      } else if (key === "toggle") {
        startTransition(() =>
          toggleSubtaskAction({ id: subtaskId, isDone: !isDone }),
        );
      }
    });
  }

  //Pending state while deleting or updating
  const isPending = useSubtaskListItemPending();

  return (
    <ItemBaseActionMenuTrigger
      onAction={handleAction}
      renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
      renderButton={() => (
        <ItemBaseActionMenuButton
          isPending={isPending}
          data-test="subtask-item-action-menu-trigger"
          data-id={subtaskId}
          className={twMerge(
            "-mx-2 -my-1.25 shrink-0 self-start",
            buttonClassName,
          )}
        />
      )}
    >
      <Item textValue={t("edit")} key="edit">
        <Pencil size={16} /> {t("edit")}
      </Item>
      <Item textValue={isDone ? t("undone") : t("done")} key="toggle">
        <CheckCheck size={16} /> {isDone ? t("undone") : t("done")}
      </Item>
      <Item textValue={t("delete")} key="delete">
        <Trash size={16} /> {t("delete")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
