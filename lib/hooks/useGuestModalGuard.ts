import { useCallback } from "react";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCurrentUser } from "@/components/common/CurrentUserContext";

// If the user is a guest, show the guest mode modal instead of allowing action
export function useGuestModalGuard() {
  const { isGuest } = useCurrentUser();
  const { onOpenChange } = useGuestModeModal();

  const guard = useCallback(
    (action: () => any) => {
      if (isGuest) {
        onOpenChange(true);
        return;
      }

      return action();
    },
    [isGuest, onOpenChange],
  );

  return guard;
}
