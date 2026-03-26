"use client";

import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useDeleteCustomer } from "../DeleteCustomerContext";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { useUpdateCustomerModal } from "../UpdateCustomerModal";
import { useDeleteCustomerModal } from "../DeleteCustomerModal";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/components/common/NavigationButton";

export function CustomerDetailActions() {
  const t = useTranslations("customers.CustomerDetailActions");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete customer: action state + form modal state from context
  const { isPending: isDeletePending } = useDeleteCustomer();
  const { onOpenChange: onDeleteModalOpenChange } = useDeleteCustomerModal();

  // Update customer: action state + form modal state from context
  const { isPending: isUpdatePending } = useUpdateCustomer();
  const { onOpenChange: onUpdateModalOpenChange } = useUpdateCustomerModal();

  function handleDeletePress() {
    guestGuard(() => onDeleteModalOpenChange(true));
  }

  function handleEditPress() {
    guestGuard(() => {
      onUpdateModalOpenChange(true);
    });
  }

  return (
    <div data-test="customer-detail-actions" className="flex flex-col gap-2.5">
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
  );
}
