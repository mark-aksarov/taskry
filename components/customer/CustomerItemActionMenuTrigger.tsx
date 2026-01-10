"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditCustomerModal } from "./EditCustomerModal";
import { ItemBaseActionMenuTrigger } from "../common/ItemBase";
import { DeleteEntityModal } from "../common/DeleteEntityModal";

export type CustomerItemActionMenuTriggerProps = {
  customerId: number;
  customerFullName: string;
  className?: string;
  deleteAction: ActionFn<ActionState, DeleteCustomersPayload>;
};

export function CustomerItemActionMenuTrigger({
  customerId,
  customerFullName,
  className,
  deleteAction,
}: CustomerItemActionMenuTriggerProps) {
  const t = useTranslations("customers.CustomerItemActionMenuTrigger");
  const [isDeleteCustomerModalOpen, setIsDeleteCustomerModalOpen] =
    useState(false);
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);

  function handleAction(key: Key) {
    if (key === "edit") {
      setIsEditCustomerModalOpen(true);
    } else if (key === "delete") {
      setIsDeleteCustomerModalOpen(true);
    }
  }

  return (
    <>
      <ItemBaseActionMenuTrigger
        trigger-data-test={`customer-item-${customerId}-action-menu-trigger`}
        className={className}
        onAction={handleAction}
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
        customerId={customerId}
      />

      <DeleteEntityModal
        entityId={customerId}
        entityName={customerFullName}
        translationNamespace="customers.DeleteCustomerModal"
        isOpen={isDeleteCustomerModalOpen}
        onOpenChange={setIsDeleteCustomerModalOpen}
        deleteAction={deleteAction}
      />
    </>
  );
}
