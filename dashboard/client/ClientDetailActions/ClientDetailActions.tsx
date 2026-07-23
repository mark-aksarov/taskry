"use client";

import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDeleteClient } from "../DeleteClientContext";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/dashboard/common/NavigationItem";

export function ClientDetailActions() {
  const t = useTranslations("dashboard.clients.ClientDetailActions");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete client: action state + form modal state from context
  const { isPending: isDeletePending } = useDeleteClient();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteClient");

  function handleDeletePress() {
    guestGuard(() => onDeleteModalOpenChange(true));
  }

  return (
    <div data-test="client-detail-actions" className="flex flex-col gap-2.5">
      <NavigationButton
        data-test="delete-client-button"
        isPending={isDeletePending}
        onPress={handleDeletePress}
        variant="secondary"
        iconLeft={<Trash size={18}   />}
        label={t("delete")}
      />
    </div>
  );
}
