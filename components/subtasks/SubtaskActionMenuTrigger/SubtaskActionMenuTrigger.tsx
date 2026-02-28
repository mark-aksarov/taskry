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
import { startTransition, useState } from "react";
import { focusRing } from "@/components/ui/styles";
import { EditSubtaskModal } from "../EditSubtaskModal";
import { CheckCheck, Pencil, Trash } from "lucide-react";
import { DeleteSubtaskModal } from "../DeleteSubtaskModal";
import { GuestModeModal } from "../../common/GuestModeModal";
import { useDeleteSubtaskContext } from "../DeleteSubtaskContext";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useToggleSubtaskStatusActionState } from "./useToggleSubtaskStatusActionState";

interface SubtaskActionMenuTriggerProps {
  subtaskId: number;
  subtaskText: string;
  isDone: boolean;
  toggleSubtask: ActionFn<ActionState, ToggleSubtaskPayload>;
  editSubtaskForm: React.ReactNode;
  mutate?: () => void;
}

const buttonStyles = tv({
  extend: focusRing,
  base: "pressed:underline cursor-pointer text-left text-sm hover:underline",
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
  toggleSubtask,
  editSubtaskForm,
  mutate,
}: SubtaskActionMenuTriggerProps) {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

  // Deleting the subtask
  const { isPending: isDeletePending } = useDeleteSubtaskContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Toggle subtask status
  const [_toggleSubtaskState, toggleSubtaskAction, _isToggleSubtaskPending] =
    useToggleSubtaskStatusActionState({
      toggleSubtask,
      mutate,
    });

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
      startTransition(() =>
        toggleSubtaskAction({ id: subtaskId, isDone: !isDone }),
      );
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        placement="bottom left"
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <Button
            isPending={isDeletePending}
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

      <DeleteSubtaskModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        subtaskId={subtaskId}
        subtaskText={subtaskText}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
