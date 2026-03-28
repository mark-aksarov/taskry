"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useCustomerItemPending } from "./useCustomerItemPending";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useModal } from "@/components/common/ModalManagerContext";

export type CustomerItemActionMenuTriggerProps = {
  customerId: number;
  className?: string;
};

export function CustomerItemActionMenuTrigger({
  customerId,
  className,
}: CustomerItemActionMenuTriggerProps) {
  const t = useTranslations("customers.CustomerItemActionMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteCustomer");

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateCustomer");

  /**
   * Handles menu actions for a customer item
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
  const isPending = useCustomerItemPending(customerId);

  return (
    <ItemBaseActionMenuTrigger
      onAction={handleAction}
      renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
      renderButton={() => (
        <ItemBaseActionMenuButton
          isPending={isPending}
          className={className}
          data-test="customer-item-action-menu-trigger"
          data-id={customerId}
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
