"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomerPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditCustomerModal } from "../EditCustomerModal";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { BaseDeleteCustomerModal } from "../DeleteCustomerModal";
import { startTransition, useActionState, useState } from "react";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

const initialDeleteState: ActionState = {
  status: null,
};

interface CustomerDetailActionsProps {
  customerId: number;
  customerFullName: string;
  deleteCustomer: ActionFn<ActionState, DeleteCustomerPayload>;
  editCustomerFormContainer: React.ReactNode;
}

export function CustomerDetailActions({
  customerId,
  customerFullName,
  deleteCustomer,
  editCustomerFormContainer,
}: CustomerDetailActionsProps) {
  const t = useTranslations("customers.CustomerDetailActions");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete customer: action state + form modal state
  const [, deleteAction, isDeletePending] = useActionState(
    deleteCustomer,
    initialDeleteState,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit customer: action state + form modal state from context
  const {
    isPending: isUpdatePending,
    onModalOpenChange: onEditModalOpenChange,
  } = useUpdateCustomer();

  function handleDeletePress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsDeleteModalOpen(true);
  }

  function handleEditPress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    onEditModalOpenChange(true);
  }

  // Close modal and delete customer
  // We should redirect to the customer list page after deletion
  function handleDelete() {
    setIsDeleteModalOpen(false);
    startTransition(() =>
      deleteAction({ id: customerId, shouldRedirect: true }),
    );
  }

  return (
    <>
      <div
        data-test="customer-detail-actions"
        className="flex flex-col gap-2.5"
      >
        <NavigationButton
          data-test="delete-customer-button"
          isPending={isDeletePending}
          onPress={handleDeletePress}
          variant="secondary"
          iconLeft={<Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("delete")}
        />
        <NavigationButton
          data-test="edit-customer-button"
          isPending={isUpdatePending}
          onPress={handleEditPress}
          variant="secondary"
          iconLeft={<Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("edit")}
        />
      </div>

      {/* Modal for editing customer details */}
      <EditCustomerModal
        editCustomerFormContainer={editCustomerFormContainer}
      />

      {/* Modal for confirming customer deletion */}
      <BaseDeleteCustomerModal
        customerFullName={customerFullName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={handleDelete}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
