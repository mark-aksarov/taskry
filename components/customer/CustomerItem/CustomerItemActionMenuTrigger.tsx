"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "../../common/ItemBase";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Info, Pencil, Trash } from "lucide-react";
import { EditCustomerModal } from "../EditCustomerModal";
import { GuestModeModal } from "../../common/GuestModeModal";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { useCurrentUser } from "../../common/CurrentUserContext";
import { useCustomerItemPending } from "./useCustomerItemPending";

export type CustomerItemActionMenuTriggerProps = {
  customerId: number;
  customerFullName: string;
  className?: string;
  editCustomerFormContainer: React.ReactNode;
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
};

export function CustomerItemActionMenuTrigger({
  customerId,
  customerFullName,
  className,
  editCustomerFormContainer,
  deleteCustomer,
}: CustomerItemActionMenuTriggerProps) {
  const t = useTranslations("customers.CustomerItemActionMenuTrigger");

  // Deleting the customer
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the customer
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);

  // Handle menu actions
  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "details") {
      return;
    }

    if (key === "edit") {
      setIsEditCustomerModalOpen(true);
    } else if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
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
        isOpen={isEditCustomerModalOpen}
        onOpenChange={setIsEditCustomerModalOpen}
        editCustomerFormContainer={editCustomerFormContainer}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />

      <DeleteCustomerModal
        customerId={customerId}
        customerFullName={customerFullName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteCustomer={deleteCustomer}
      />
    </>
  );
}
