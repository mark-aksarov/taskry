"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { NewPositionModal } from "../NewPositionModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";

interface PositionToolbarCreateNewModalTriggerProps {
  guestMode: boolean;
  createPosition: ActionFn<ActionState, FormData>;
}

export function PositionToolbarCreateNewModalTrigger({
  guestMode,
  createPosition,
}: PositionToolbarCreateNewModalTriggerProps) {
  const t = useTranslations("positions.PositionToolbarCreateNewModalTrigger");

  // Create new position modal
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  const handlePress = () => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsPositionModalOpen(true);
  };

  return (
    <>
      <ToolbarCreateNewModalTrigger
        data-test="position-toolbar-create-new-modal-trigger"
        label={t("label")}
        onPress={handlePress}
      />
      <NewPositionModal
        isOpen={isPositionModalOpen}
        onOpenChange={setIsPositionModalOpen}
        createPosition={createPosition}
      />
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
