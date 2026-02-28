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
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCurrentUser } from "../../common/CurrentUserContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useCompanyListItemPending } from "./useCompanyListItemPending";
import { DeleteCompanyModal } from "@/components/company/DeleteCompanyModal";

export type CompanyListItemActionMenuTriggerProps = {
  companyId: number;
  companyName: string;
  updateCompany: ActionFn<ActionState, FormData>;
  deleteCompany: ActionFn<ActionState, number[]>;
};

export function CompanyListItemActionMenuTrigger({
  companyId,
  companyName,
  updateCompany,
  deleteCompany,
}: CompanyListItemActionMenuTriggerProps) {
  const t = useTranslations("company.CompanyListItemActionMenuTrigger");

  // Deleting the company
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the company
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsEditModalOpen(true);
    } else if (action === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  //Pending state while deleting or updating
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

      <EditCompanyModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        companyId={companyId}
        companyName={companyName}
        updateCompany={updateCompany}
      />

      <DeleteCompanyModal
        companyId={companyId}
        companyName={companyName}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteCompany={deleteCompany}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
