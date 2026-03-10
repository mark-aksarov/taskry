"use client";

import { useTranslations } from "next-intl";
import { useCreatePosition } from "./CreatePositionContext";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";

export function PositionToolbarCreateNewModalTrigger() {
  const t = useTranslations("positions.PositionToolbarCreateNewModalTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create position action and modal states
  const {
    isPending: isCreatePositionPending,
    onModalOpenChange: onPositionModalOpenChange,
  } = useCreatePosition();

  /**
   * Handles menu actions for creating a position
   * - If user is a guest, show guest modal
   * - Otherwise, open create position modal
   */
  const handlePress = () => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    onPositionModalOpenChange(true);
  };

  return (
    <ToolbarCreateNewModalTrigger
      data-test="position-toolbar-create-new-modal-trigger"
      label={t("label")}
      onPress={handlePress}
      // Block creating another position until the current request completes
      isDisabled={isCreatePositionPending}
    />
  );
}
