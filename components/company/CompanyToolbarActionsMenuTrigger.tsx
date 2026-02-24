"use client";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../common/Toolbar";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { GuestModeModal } from "../common/GuestModeModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { DeleteCompaniesModal } from "./DeleteCompaniesModal";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface CompanyToolbarActionsMenuTriggerProps {
  guestMode: boolean;
  deleteCompanies: ActionFn<ActionState, number[]>;
}

export const CompanyToolbarActionsMenuTrigger = ({
  guestMode,
  deleteCompanies,
}: CompanyToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("company.CompanyToolbarActionsMenuTrigger");

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected with checkbox companies
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  const isDisabled = selected.ids.length === 0;

  return (
    <>
      <ToolbarMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <>
            <ToolbarActionsButtonMobile
              data-test="company-toolbar-actions-button-mobile"
              isDisabled={isDisabled}
            />
            <ToolbarActionsButtonDesktop
              data-test="company-toolbar-actions-button-desktop"
              isDisabled={isDisabled}
            />
          </>
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ToolbarMenuTrigger>

      <DeleteCompaniesModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        companyIds={selected.ids}
        deleteCompanies={deleteCompanies}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
