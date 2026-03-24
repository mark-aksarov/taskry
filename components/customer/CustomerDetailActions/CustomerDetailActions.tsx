"use client";

import {
  UpdateCustomerModal,
  useUpdateCustomerModal,
} from "../UpdateCustomerModal";

import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { startTransition, useState } from "react";
import { useDeleteCustomer } from "../DeleteCustomerContext";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { BaseDeleteCustomerModal } from "../DeleteCustomerModal";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/components/common/NavigationButton";

interface CustomerDetailActionsProps {
  customerId: number;
  customerFullName: string;
  updateCustomerFormContainer: React.ReactNode;
}

export function CustomerDetailActions({
  customerId,
  customerFullName,
  updateCustomerFormContainer,
}: CustomerDetailActionsProps) {
  const t = useTranslations("customers.CustomerDetailActions");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete customer: action state + form modal state
  const { isPending: isDeletePending, action: deleteAction } =
    useDeleteCustomer();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Update customer: action state + form modal state from context
  const { isPending: isUpdatePending } = useUpdateCustomer();
  const { onOpenChange: onUpdateModalOpenChange } = useUpdateCustomerModal();

  function handleDeletePress() {
    guestGuard(() => setIsDeleteModalOpen(true));
  }

  function handleEditPress() {
    guestGuard(() => {
      onUpdateModalOpenChange(true);
    });
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
      <UpdateCustomerModal
        updateCustomerFormContainer={updateCustomerFormContainer}
      />

      {/* Modal for confirming customer deletion */}
      <BaseDeleteCustomerModal
        customerFullName={customerFullName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onDelete={handleDelete}
      />
    </>
  );
}
