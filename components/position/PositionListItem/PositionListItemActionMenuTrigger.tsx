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
import { UpdatePositionModal } from "../UpdatePositionModal";
import { DeletePositionModal } from "../DeletePositionModal";
import { useUpdatePositionModal } from "../UpdatePositionModal";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
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

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for update modal from context
  const { onOpenChange: onUpdatePositionModalOpenChange } =
    useUpdatePositionModal();

  /**
   * Handles menu actions for a position item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    guestGuard(() => {
      const action = key.toString();
      if (action === "edit") {
        onUpdatePositionModalOpenChange(true);
      } else if (action === "delete") {
        setIsDeleteModalOpen(true);
      }
    });
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
      <UpdatePositionModal
        positionId={positionId}
        positionName={positionName}
      />

      <DeletePositionModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        positionId={positionId}
        positionName={positionName}
      />
    </>
  );
}
