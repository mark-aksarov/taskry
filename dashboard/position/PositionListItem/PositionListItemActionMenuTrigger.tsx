"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { usePositionListItemPending } from "./usePositionListItemPending";

export type PositionListItemActionMenuTriggerProps = {
  positionId: number;
};

export function PositionListItemActionMenuTrigger({
  positionId,
}: PositionListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "dashboard.positions.PositionListItemActionMenuTrigger",
  );

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deletePosition");

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updatePosition");

  /**
   * Handles menu actions for a position item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    guestGuard(() => {
      const action = key.toString();
      if (action === "edit") {
        onUpdateModalOpenChange(true);
      } else if (action === "delete") {
        onDeleteModalOpenChange(true);
      }
    });
  };

  // Determine if any action on this position item is pending (update or delete)
  const isPending = usePositionListItemPending(positionId);

  return (
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
  );
}
