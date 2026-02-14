"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { NewPositionModal } from "../NewPositionModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";

interface PositionToolbarCreateNewModalTriggerProps {
  guestMode: boolean;
  newPositionForm: React.ReactNode;
}

export function PositionToolbarCreateNewModalTrigger({
  guestMode,
  newPositionForm,
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
        data-test="position-toolbar-create-new-button"
        label={t("label")}
        onPress={handlePress}
      />
      <NewPositionModal
        isOpen={isPositionModalOpen}
        onOpenChange={setIsPositionModalOpen}
        newPositionForm={newPositionForm}
      />
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
