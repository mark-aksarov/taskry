"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditCompanyModal } from "../EditCompanyModal";
import { useUpdateCompany } from "../UpdateCompanyContext";
import { useCurrentUser } from "../../common/CurrentUserContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useCompanyListItemPending } from "./useCompanyListItemPending";
import { DeleteCompanyModal } from "@/components/company/DeleteCompanyModal";

export type CompanyListItemActionMenuTriggerProps = {
  companyId: number;
  companyName: string;
};

export function CompanyListItemActionMenuTrigger({
  companyId,
  companyName,
}: CompanyListItemActionMenuTriggerProps) {
  const t = useTranslations("company.CompanyListItemActionMenuTrigger");

  // Detect if the current user is a guest
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for edit modal from context
  const {
    isModalOpen: isEditModalOpen,
    onModalOpenChange: onEditModalOpenChange,
  } = useUpdateCompany();

  /**
   * Handles menu actions for a company item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      onEditModalOpenChange(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  // Determine if any action on this company item is pending (update or delete)
  const isPending = useCompanyListItemPending(companyId);

  return (
    <>
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

      {/* Modals for editing, deleting, and guest mode */}
      <EditCompanyModal
        isOpen={isEditModalOpen}
        onOpenChange={onEditModalOpenChange}
        companyId={companyId}
        companyName={companyName}
      />

      <DeleteCompanyModal
        companyId={companyId}
        companyName={companyName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
