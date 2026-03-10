"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { useGuestModeModal } from "../common/GuestModeModal";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { DeleteCustomersModal } from "./DeleteCustomersModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

export const CustomerToolbarActionsMenuTrigger = () => {
  const t = useTranslations("customers.CustomerToolbarActionsMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected with checkbox customers
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        selectedIds={selected.ids}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ToolbarActionsMenuTrigger>

      {/* Modal for confirming customer deletion */}
      <DeleteCustomersModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
};
