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

import { tv } from "tailwind-variants";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { focusRing } from "@/components/ui/styles";
import { EditSubtaskModal } from "../EditSubtaskModal";
import { CheckCheck, Pencil, Trash } from "lucide-react";
import { GuestModeModal } from "../../common/GuestModeModal";
import { useDeleteSubtaskModal } from "../DeleteSubtaskModal";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { startTransition, useActionState, useEffect, useState } from "react";

const toggleSubtaskInitialState: ActionState = {
  status: null,
};

interface SubtaskActionMenuTriggerProps {
  subtaskId: number;
  subtaskText: string;
  isDone: boolean;
  guestMode: boolean;
  toggleSubtaskAction: ActionFn<ActionState, ToggleSubtaskPayload>;
  editSubtaskForm: React.ReactNode;
  mutate?: () => void;
}

const buttonStyles = tv({
  extend: focusRing,
  base: "cursor-pointer text-left text-sm",
  variants: {
    isDone: {
      true: "text-black dark:text-white",
      false: "text-gray-500 dark:text-gray-400",
    },
  },
});

export function SubtaskActionMenuTrigger({
  subtaskId,
  subtaskText,
  isDone,
  guestMode,
  toggleSubtaskAction,
  editSubtaskForm,
  mutate,
}: SubtaskActionMenuTriggerProps) {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

  // Toggle IsDone
  const [toggleSubtaskState, toggleSubtask, toggleSubtaskIsPending] =
    useActionState(toggleSubtaskAction, toggleSubtaskInitialState);

  useEffect(() => {
    if (toggleSubtaskState.status === "success") {
      mutate?.();
    }
  }, [toggleSubtaskState, mutate]);

  useActionErrorToast(toggleSubtaskState);

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete State
  const { setState: setDeleteSubtaskModalState } = useDeleteSubtaskModal();

  // Edit modal / bottom sheet
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setDeleteSubtaskModalState({
        isOpen: true,
        entityId: subtaskId,
        entityName: subtaskText,
      });
    } else if (key === "edit") {
      setIsOpenEditModal(true);
    } else if (key === "toggle") {
      startTransition(() => toggleSubtask({ id: subtaskId, isDone: !isDone }));
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        placement="top left"
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <Button
            className={(renderProps) =>
              buttonStyles({ ...renderProps, isDone })
            }
          >
            {subtaskText}
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
        onOpenChange={setIsOpenEditModal}
        editSubtaskForm={editSubtaskForm}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
