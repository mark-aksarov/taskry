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
import { useUpdatePosition } from "../UpdatePositionContext";
import { DeletePositionModal } from "../DeletePositionModal";
import { useCurrentUser } from "../../common/CurrentUserContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { usePositionListItemPending } from "./usePositionListItemPending";

export type PositionListItemActionMenuTriggerProps = {
  positionId: number;
  positionName: string;
};

export function PositionListItemActionMenuTrigger({
  positionId,
  positionName,
}: PositionListItemActionMenuTriggerProps) {
  const t = useTranslations("positions.PositionListItemActionMenuTrigger");

  // Detect if the current user is a guest
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for edit modal from context
  const { onModalOpenChange: onEditModalOpenChange } = useUpdatePosition();

  /**
   * Handles menu actions for a position item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      onEditModalOpenChange(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  // Determine if any action on this position item is pending (update or delete)
  const isPending = usePositionListItemPending(positionId);

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            isPending={isPending}
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

      {/* Modals for editing, deleting, and guest mode */}
      <EditPositionModal positionId={positionId} positionName={positionName} />

      <DeletePositionModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        positionId={positionId}
        positionName={positionName}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
