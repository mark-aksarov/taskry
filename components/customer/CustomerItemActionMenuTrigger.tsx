"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditCustomerModal } from "./EditCustomerModal";
import { DeleteCustomerModal } from "./DeleteCustomerModal";
import { GuestModeModal } from "../common/GuestModeModal";

export type CustomerItemActionMenuTriggerProps = {
  guestMode: boolean;
  customerId: number;
  customerFullName: string;
  className?: string;
  deleteAction: ActionFn<ActionState, DeleteCustomersPayload>;
  editCustomerFormContainer: React.ReactNode;
};

export function CustomerItemActionMenuTrigger({
  guestMode,
  customerId,
  customerFullName,
  className,
  deleteAction,
  editCustomerFormContainer,
}: CustomerItemActionMenuTriggerProps) {
  const t = useTranslations("customers.CustomerItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for deleting the customer
  const [isDeleteCustomerModalOpen, setIsDeleteCustomerModalOpen] =
    useState(false);

  // Modal state for editing the customer
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);

  // Handle menu actions
  function handleAction(key: Key) {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "edit") {
      setIsEditCustomerModalOpen(true);
    } else if (key === "delete") {
      setIsDeleteCustomerModalOpen(true);
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
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

      <EditCustomerModal
        isOpen={isEditCustomerModalOpen}
        onOpenChange={setIsEditCustomerModalOpen}
        editCustomerFormContainer={editCustomerFormContainer}
      />

      <DeleteCustomerModal
        customerId={customerId}
        customerFullName={customerFullName}
        isOpen={isDeleteCustomerModalOpen}
        onOpenChange={setIsDeleteCustomerModalOpen}
        deleteAction={deleteAction}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
