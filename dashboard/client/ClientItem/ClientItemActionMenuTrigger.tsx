"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useClientItemPending } from "./useClientItemPending";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useModal } from "@/common/ModalManagerContext";

export type ClientItemActionMenuTriggerProps = {
  clientId: number;
  className?: string;
};

export function ClientItemActionMenuTrigger({
  clientId,
  className,
}: ClientItemActionMenuTriggerProps) {
  const t = useTranslations(
    "dashboard.clients.ClientItemActionMenuTrigger",
  );

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteClient");

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateClient");

  /**
   * Handles menu actions for a client item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "edit") {
        onUpdateModalOpenChange(true);
      } else if (key === "delete") {
        onDeleteModalOpenChange(true);
      }
    });
  }

  //Pending state while deleting or updating
  const isPending = useClientItemPending(clientId);

  return (
    <ItemBaseActionMenuTrigger
      onAction={handleAction}
      renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
      renderButton={() => (
        <ItemBaseActionMenuButton
          isPending={isPending}
          className={className}
          data-test="client-item-action-menu-trigger"
          data-id={clientId}
        />
      )}
    >
      <Item textValue={t("edit")} key="edit">
        <Pencil  /> {t("edit")}
      </Item>
      <Item textValue={t("delete")} key="delete">
        <Trash  /> {t("delete")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
