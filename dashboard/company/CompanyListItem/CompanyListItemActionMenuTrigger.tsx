"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useCompanyListItemPending } from "./useCompanyListItemPending";

export type CompanyListItemActionMenuTriggerProps = {
  companyId: number;
};

export function CompanyListItemActionMenuTrigger({
  companyId,
}: CompanyListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "dashboard.company.CompanyListItemActionMenuTrigger",
  );

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state from context
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteCompany");

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateCompany");

  /**
   * Handles menu actions for a company item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    guestGuard(() => {
      const action = key.toString();
      if (action === "edit") {
        onUpdateModalOpenChange(true);
      } else if (action === "delete") {
        onDeleteModalOpenChange(true);
      }
    });
  };

  // Determine if any action on this company item is pending (update or delete)
  const isPending = useCompanyListItemPending(companyId);

  return (
    <ItemBaseActionMenuTrigger
      onAction={handleAction}
      renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
      renderButton={() => (
        <ItemBaseActionMenuButton
          isPending={isPending}
          data-test="company-item-action-menu-trigger"
          data-id={companyId}
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
  );
}
