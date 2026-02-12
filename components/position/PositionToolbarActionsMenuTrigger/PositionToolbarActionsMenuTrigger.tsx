"use client";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../../common/Toolbar";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../../ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "../../common/GuestModeModal";
import { DeletePositionsModal } from "../DeletePositionsModal";
import { usePositionSelection } from "@/lib/hooks/usePositionSelection";

interface PositionToolbarActionsMenuTriggerProps {
  guestMode: boolean;
  deletePositions: ActionFn<ActionState, number[]>;
}

export const PositionToolbarActionsMenuTrigger = ({
  guestMode,
  deletePositions,
}: PositionToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("positions.PositionToolbarActionsMenuTrigger");

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const {
    selectedIds: positionIds,
    clearSelectedIds,
    selectedItems,
  } = usePositionSelection();

  const isDisabled = positionIds.length === 0;

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
              data-test="position-toolbar-actions-button-mobile"
              isDisabled={isDisabled}
            />
            <ToolbarActionsButtonDesktop
              data-test="position-toolbar-actions-button-desktop"
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

      <DeletePositionsModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        positionIds={positionIds}
        deletePositions={deletePositions}
        onSuccess={clearSelectedIds}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
