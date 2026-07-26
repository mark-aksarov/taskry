"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
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

  // Delete confirmation modal state from context
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteCompany");

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateCompany");

  /**
   * Open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    const action = key.toString();
    if (action === "edit") {
      onUpdateModalOpenChange(true);
    } else if (action === "delete") {
      onDeleteModalOpenChange(true);
    }
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
        <Pencil /> {t("edit")}
      </Item>
      <Item textValue={t("delete")} key="delete">
        <Trash /> {t("delete")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
