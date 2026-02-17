"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditPositionModal } from "../EditPositionModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useDeletePositionModal } from "../DeletePositionModal";

export type PositionItemActionMenuTriggerProps = {
  guestMode: boolean;
  positionId: number;
  positionName: string;
  editPositionForm: React.ReactNode;
};

export function PositionItemActionMenuTrigger({
  guestMode,
  positionId,
  positionName,
  editPositionForm,
}: PositionItemActionMenuTriggerProps) {
  const t = useTranslations("positions.PositionItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the position
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the position
  const { setState: setDeletePositionModalState } = useDeletePositionModal();

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsEditModalOpen(true);
    } else if (action === "delete") {
      setDeletePositionModalState({
        isOpen: true,
        entityId: positionId,
        entityName: positionName,
      });
    }
  };

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            data-test="position-item-action-menu-trigger"
            data-id={positionId}
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

      <EditPositionModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editPositionForm={editPositionForm}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
