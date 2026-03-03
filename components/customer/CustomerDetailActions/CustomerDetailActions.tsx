"use client";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { startTransition, useState } from "react";
import { EditCustomerModal } from "../EditCustomerModal";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { BaseDeleteCustomerModal } from "../DeleteCustomerModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useDeleteEntityState } from "@/lib/hooks/useDeleteEntityState";

interface CustomerDetailActionsProps {
  customerId: number;
  customerFullName: string;
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
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
  const { action, isPending: isDeletePending } =
    useDeleteEntityState(deleteCustomer);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit customer: action state + form modal state
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
    startTransition(() => action({ ids: [customerId], shouldRedirect: true }));
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
