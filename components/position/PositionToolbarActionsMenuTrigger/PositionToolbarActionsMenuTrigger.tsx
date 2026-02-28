"use client";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
  ToolbarActionsMenuTrigger,
} from "../../common/Toolbar";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../../ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "../../common/GuestModeModal";
import { DeletePositionsModal } from "../DeletePositionsModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface PositionToolbarActionsMenuTriggerProps {
  deletePositions: ActionFn<ActionState, number[]>;
}

export const PositionToolbarActionsMenuTrigger = ({
  deletePositions,
}: PositionToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("positions.PositionToolbarActionsMenuTrigger");

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected with checkbox positions
  const selected = useSelectedItems();

  // Menu actions: show delete modal
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
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

      <DeletePositionsModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        positionIds={selected.ids}
        deletePositions={deletePositions}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
