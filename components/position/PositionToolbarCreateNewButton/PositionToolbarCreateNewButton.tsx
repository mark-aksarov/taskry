"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { NewPositionModal } from "../NewPositionModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewButton } from "@/components/common/Toolbar";

interface PositionToolbarCreateNewButtonProps {
  guestMode: boolean;
  newPositionForm: React.ReactNode;
}

export function PositionToolbarCreateNewButton({
  guestMode,
  newPositionForm,
}: PositionToolbarCreateNewButtonProps) {
  const t = useTranslations("positions.PositionToolbarCreateNewButton");

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
      <ToolbarCreateNewButton
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
