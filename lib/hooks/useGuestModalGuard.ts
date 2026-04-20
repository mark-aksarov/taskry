import { useCallback } from "react";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useCurrentUser } from "@/dashboard/common/CurrentUserContext";

// If the user is a guest, show the guest mode modal instead of allowing action
export function useGuestModalGuard() {
  const { isGuest } = useCurrentUser();
  const { onOpenChange } = useModal("guestMode");

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
