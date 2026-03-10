"use client";

import {
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import { tv } from "tailwind-variants";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { startTransition, useState } from "react";
import { focusRing } from "@/components/ui/styles";
import { EditSubtaskModal } from "../EditSubtaskModal";
import { DeleteSubtaskModal } from "../DeleteSubtaskModal";
import { useToggleSubtask } from "../ToggleSubtaskContext";
import { useUpdateSubtask } from "../UpdateSubtaskContext";
import { useGuestModeModal } from "../../common/GuestModeModal";
import { CheckCheck, Loader2, Pencil, Trash } from "lucide-react";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useSubtaskListItemPending } from "../SubtaskListItem/useSubtaskListItemPending";

interface SubtaskActionMenuTriggerProps {
  taskId: number;
  subtaskId: number;
  subtaskText: string;
  isDone: boolean;
}

const buttonStyles = tv({
  extend: focusRing,
  base: "pressed:underline flex cursor-pointer items-center gap-2 text-left text-sm hover:underline",
  variants: {
    isDone: {
      true: "text-black dark:text-white",
      false: "text-gray-500 dark:text-gray-400",
    },
  },
});

export function SubtaskActionMenuTrigger({
  taskId,
  subtaskId,
  subtaskText,
  isDone,
}: SubtaskActionMenuTriggerProps) {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

  // Detect if the current user is a guest
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // States for toggling subtask from context
  const { action: toggleSubtaskAction } = useToggleSubtask();

  // State for edit modal from context
  const { onModalOpenChange: onEditModalOpenChange } = useUpdateSubtask();

  function handleAction(key: Key) {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else if (key === "edit") {
      onEditModalOpenChange(true);
    } else if (key === "toggle") {
      startTransition(() =>
        toggleSubtaskAction({ id: subtaskId, isDone: !isDone }),
      );
    }
  }

  //Pending state while deleting or updating
  const isPending = useSubtaskListItemPending();

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        placement="bottom left"
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <Button
            isPending={isPending}
            className={(renderProps) =>
              buttonStyles({ ...renderProps, isDone })
            }
          >
            {subtaskText}
            {isPending && (
              <Loader2
                data-testid="loader-icon"
                size={16}
                strokeWidth={1.5}
                absoluteStrokeWidth
                className="animate-spin"
              />
            )}
          </Button>
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

      <EditSubtaskModal
        taskId={taskId}
        subtaskId={subtaskId}
        subtaskText={subtaskText}
      />

      <DeleteSubtaskModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        subtaskId={subtaskId}
        subtaskText={subtaskText}
      />
    </>
  );
}
