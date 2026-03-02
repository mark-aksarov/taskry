"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCreatePosition } from "./CreatePositionContext";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

export function PositionToolbarCreateNewModalTrigger() {
  const t = useTranslations("positions.PositionToolbarCreateNewModalTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Create position action and modal states
  const {
    isPending: isCreatePositionPending,
    isModalOpen: isCreatePositionModalOpen,
    onModalOpenChange: onPositionModalOpenChange,
  } = useCreatePosition();

  /**
   * Handles menu actions for creating a position
   * - If user is a guest, show guest modal
   * - Otherwise, open create position modal
   */
  const handlePress = () => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    onPositionModalOpenChange(true);
  };

  return (
    <>
      <ToolbarCreateNewModalTrigger
        data-test="position-toolbar-create-new-modal-trigger"
        label={t("label")}
        onPress={handlePress}
        // Block creating another position until the current request completes
        // When the modal opens, a reset action is triggered, the pending state becomes true, and flickering occurs
        isDisabled={isCreatePositionPending && !isCreatePositionModalOpen}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
