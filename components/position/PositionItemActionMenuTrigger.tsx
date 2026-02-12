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
import { GuestModeModal } from "@/components/common/GuestModeModal";

export type PositionItemActionMenuTriggerProps = {
  guestMode: boolean;
  positionId: number;
  positionName: string;
};

export function PositionItemActionMenuTrigger({
  guestMode,
  positionId,
  positionName,
}: PositionItemActionMenuTriggerProps) {
  const t = useTranslations("positions.PositionItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the position
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // Modal state for deleting the position
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsOpenEditModal(true);
    } else if (action === "delete") {
      setIsOpenDeleteModal(true);
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

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
