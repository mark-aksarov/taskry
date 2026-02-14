"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import {
  ActionFn,
  ActionState,
  ToggleSubtaskPayload,
} from "@/lib/actions/types";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { EditSubtaskModal } from "../EditSubtaskModal";
import { DeleteSubtaskModal } from "../DeleteSubtaskModal";
import { GuestModeModal } from "../../common/GuestModeModal";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { CheckCheck, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { startTransition, useActionState, useEffect, useState } from "react";

const toggleSubtaskInitialState: ActionState = {
  status: null,
};

interface SubtaskActionMenuTriggerProps {
  subtaskId: number;
  isDone: boolean;
  subtaskText: string;
  guestMode: boolean;
  deleteAction: ActionFn<ActionState, number>;
  toggleSubtaskAction: ActionFn<ActionState, ToggleSubtaskPayload>;
  editSubtaskForm: React.ReactNode;
  mutate?: () => void;
}

export function SubtaskActionMenuTrigger({
  subtaskId,
  isDone,
  subtaskText,
  guestMode,
  deleteAction,
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
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Edit modal / bottom sheet
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsOpenDeleteModal(true);
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
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className="-m-1.25 rounded-full text-gray-500 dark:text-gray-400"
            iconLeft={
              <EllipsisVertical
                size={16}
                absoluteStrokeWidth
                strokeWidth={1.25}
              />
            }
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

      <EditSubtaskModal
        isOpen={isOpenEditModal}
        onOpenChange={setIsOpenEditModal}
        editSubtaskForm={editSubtaskForm}
      />

      <DeleteSubtaskModal
        subtaskId={subtaskId}
        subtaskText={subtaskText}
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        deleteAction={deleteAction}
        mutate={mutate}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
