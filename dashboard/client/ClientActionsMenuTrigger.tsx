"use client";

import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ActionsButton } from "../common/ActionsButton";
import { useModal } from "../../common/ModalManagerContext";
import { ActionsMenuTrigger } from "../common/ActionsMenuTrigger";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { useSelectedItems } from "@/dashboard/common/SelectedItemsContext";

export const ClientActionsMenuTrigger = () => {
  const t = useTranslations("dashboard.clients.ClientActionsMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const { onOpenChange: setIsDeleteModalOpen } = useModal("deleteClients");

  // Selected with checkbox clients
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    guestGuard(() => {
      if (key === "delete") {
        setIsDeleteModalOpen(true);
      }
    });
  };

  return (
    <>
      <ActionsMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        )}
        renderButton={() => (
          <ActionsButton
            data-test="client-actions-menu-trigger"
            selectedIds={selected.ids}
          />
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash    />
          {t("delete")}
        </Item>
      </ActionsMenuTrigger>
    </>
  );
};
