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
import { EditCompanyModal } from "../EditPositionModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useDeleteCompanyModal } from "@/components/company/DeleteCompanyModal";

export type CompanyItemActionMenuTriggerProps = {
  guestMode: boolean;
  companyId: number;
  companyName: string;
  editCompanyForm: React.ReactNode;
  deleteCompanies: ActionFn<ActionState, number[]>;
};

export function CompanyItemActionMenuTrigger({
  guestMode,
  companyId,
  companyName,
  editCompanyForm,
}: CompanyItemActionMenuTriggerProps) {
  const t = useTranslations("company.CompanyItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the company
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the company
  const { setState: setDeleteCompanyModalState } = useDeleteCompanyModal();

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsEditModalOpen(true);
    } else if (action === "delete") {
      setDeleteCompanyModalState({
        isOpen: true,
        entityId: companyId,
        entityName: companyName,
      });
    }
  };

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
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

      <EditCompanyModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editCompanyForm={editCompanyForm}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
