import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreatePositionTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();
  const { onOpenChange: onCreatePositionModalOpenChange } =
    useModal("createPosition");

  const handlePress = () => {
    guestGuard(() => onCreatePositionModalOpenChange(true));
  };

  return handlePress;
}
