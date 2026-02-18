"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditCustomerModal } from "../EditCustomerModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { DeleteCustomerModal } from "../DeleteCustomerModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";

interface CustomerDetailActionsProps {
  guestMode: boolean;
  customerId: number;
  customerFullName: string;
  deleteCustomer: ActionFn<ActionState, number[]>;
  editCustomerFormContainer: React.ReactNode;
}

export function CustomerDetailActions({
  guestMode,
  customerId,
  customerFullName,
  deleteCustomer,
  editCustomerFormContainer,
}: CustomerDetailActionsProps) {
  const t = useTranslations("customers.CustomerDetailActions");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the task
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleDeletePress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsDeleteModalOpen(true);
  }

  function handleEditPress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsEditModalOpen(true);
  }

  return (
    <>
      <div
        data-test="customer-detail-actions"
        className="flex flex-col gap-2.5"
      >
        <NavigationButton
          data-test="delete-customer-button"
          onPress={handleDeletePress}
          variant="secondary"
        >
          <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </NavigationButton>
        <NavigationButton
          data-test="edit-customer-button"
          onPress={handleEditPress}
          variant="secondary"
        >
          <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("edit")}
        </NavigationButton>
      </div>

      {/* Modal for editing customer details */}
      <EditCustomerModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editCustomerFormContainer={editCustomerFormContainer}
      />

      {/* Modal for confirming customer deletion */}
      <DeleteCustomerModal
        customerId={customerId}
        customerFullName={customerFullName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteCustomer={deleteCustomer}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
