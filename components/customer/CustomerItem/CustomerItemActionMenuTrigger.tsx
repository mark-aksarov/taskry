"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Info, Pencil, Trash } from "lucide-react";
import { EditCustomerModal } from "../EditCustomerModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { useCustomerItemPending } from "./useCustomerItemPending";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export type CustomerItemActionMenuTriggerProps = {
  customerId: number;
  customerFullName: string;
  className?: string;
  editCustomerFormContainer: React.ReactNode;
};

export function CustomerItemActionMenuTrigger({
  customerId,
  customerFullName,
  className,
  editCustomerFormContainer,
}: CustomerItemActionMenuTriggerProps) {
  const t = useTranslations("customers.CustomerItemActionMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for edit modal from context
  const { onModalOpenChange: onEditModalOpenChange } = useUpdateCustomer();

  /**
   * Handles menu actions for a customer item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "details") {
        return;
      }

      if (key === "edit") {
        onEditModalOpenChange(true);
      } else if (key === "delete") {
        setIsDeleteModalOpen(true);
      }
    });
  }

  //Pending state while deleting or updating
  const isPending = useCustomerItemPending(customerId);

  return (
    <>
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
        <Item
          href={`/customers/${customerId}`}
          textValue={t("details")}
          key="details"
        >
          <Info size={16} /> {t("details")}
        </Item>
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <EditCustomerModal
        editCustomerFormContainer={editCustomerFormContainer}
      />

      <DeleteCustomerModal
        customerId={customerId}
        customerFullName={customerFullName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
}
