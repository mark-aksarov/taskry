"use client";

import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDeleteCustomer } from "../DeleteCustomerContext";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/dashboard/common/NavigationItem";

export function CustomerDetailActions() {
  const t = useTranslations("dashboard.customers.CustomerDetailActions");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete customer: action state + form modal state from context
  const { isPending: isDeletePending } = useDeleteCustomer();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteCustomer");

  function handleDeletePress() {
    guestGuard(() => onDeleteModalOpenChange(true));
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
    </div>
  );
}
