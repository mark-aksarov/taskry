import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCreatePosition } from "../CreatePositionContext";

export function useCreatePositionTriggerPress() {
  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create task category action and modal states
  const { onModalOpenChange: onPositionModalOpenChange } = useCreatePosition();

  const handlePress = () => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    onPositionModalOpenChange(true);
  };

  return handlePress;
}
