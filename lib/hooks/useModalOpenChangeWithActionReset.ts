import { startTransition, useCallback } from "react";

// When open modal, reset action state
export function useModalOpenChangeWithActionReset(
  action: (payload: any) => void,
  onModalOpenChange: (isOpen: boolean) => void,
) {
  return useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        startTransition(() => {
          action(null);
        });
      }

      onModalOpenChange(isOpen);
    },
    [action, onModalOpenChange],
  );
}
