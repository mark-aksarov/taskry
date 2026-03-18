"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { ActionsButton } from "../common/ActionsButton";
import { DeletePositionsModal } from "./DeletePositionsModal";
import { ActionsMenuTrigger } from "../common/ActionsMenuTrigger";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

export const PositionActionsMenuTrigger = () => {
  const t = useTranslations("positions.PositionActionsMenuTrigger");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected with checkbox positions
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
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <ActionsButton
            data-test="position-actions-menu-trigger"
            selectedIds={selected.ids}
          />
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
      </ActionsMenuTrigger>

      <DeletePositionsModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
};
