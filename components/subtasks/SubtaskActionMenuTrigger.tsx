"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DeleteSubtaskModal } from "./DeleteSubtaskModal";
import { GuestModeModal } from "../common/GuestModeModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { EditSubtaskModal } from "./EditSubtaskModal";

interface SubtaskActionMenuTriggerProps {
  subtaskId: number;
  subtaskText: string;
  guestMode: boolean;
  deleteAction: ActionFn<ActionState, number>;
  editSubtaskForm: React.ReactNode;
}

export function SubtaskActionMenuTrigger({
  subtaskId,
  subtaskText,
  guestMode,
  deleteAction,
  editSubtaskForm,
}: SubtaskActionMenuTriggerProps) {
  const t = useTranslations("subtasks.SubtaskActionMenuTrigger");

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
    } else {
      setIsOpenEditModal(true);
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            className="-m-1.25 rounded-full"
            iconLeft={
              <EllipsisVertical
                size={16}
                absoluteStrokeWidth
                strokeWidth={1.5}
              />
            }
          />
        )}
      >
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
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
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
