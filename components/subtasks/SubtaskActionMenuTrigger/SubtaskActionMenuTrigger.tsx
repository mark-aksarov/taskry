"use client";

import {
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import {
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { tv } from "tailwind-variants";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { focusRing } from "@/components/ui/styles";
import { EditSubtaskModal } from "../EditSubtaskModal";
import { DeleteSubtaskModal } from "../DeleteSubtaskModal";
import { GuestModeModal } from "../../common/GuestModeModal";
import { CheckCheck, Loader2, Pencil, Trash } from "lucide-react";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useToggleSubtaskTransition } from "../ToggleSubtaskTransitionContext";
import { useToggleSubtaskStatusActionState } from "./useToggleSubtaskStatusActionState";
import { useSubtaskListItemPending } from "../SubtaskListItem/useSubtaskListItemPending";

interface SubtaskActionMenuTriggerProps {
  taskId: number;
  subtaskId: number;
  subtaskText: string;
  isDone: boolean;
  toggleSubtask: ActionFn<ActionState, ToggleSubtaskPayload>;
  updateSubtask: ActionFn<ActionState, FormData>;
  deleteSubtask: ActionFn<ActionState, number>;
  mutate?: () => void;
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
  toggleSubtask,
  updateSubtask,
  deleteSubtask,
  mutate,
}: SubtaskActionMenuTriggerProps) {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

  // Deleting the subtask
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Toggle subtask status
  const [, toggleSubtaskAction] = useToggleSubtaskStatusActionState({
    toggleSubtask,
    mutate,
    successMessage: t("toggleSuccess"),
  });
  const { startTransition: startToggleTransition } =
    useToggleSubtaskTransition();

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Edit modal / bottom sheet
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else if (key === "edit") {
      setIsOpenEditModal(true);
    } else if (key === "toggle") {
      startToggleTransition(() =>
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
        isOpen={isOpenEditModal}
        taskId={taskId}
        subtaskId={subtaskId}
        subtaskText={subtaskText}
        onOpenChange={setIsOpenEditModal}
        updateSubtask={updateSubtask}
        mutate={mutate}
      />

      <DeleteSubtaskModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        subtaskId={subtaskId}
        subtaskText={subtaskText}
        deleteSubtask={deleteSubtask}
        mutate={mutate}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
