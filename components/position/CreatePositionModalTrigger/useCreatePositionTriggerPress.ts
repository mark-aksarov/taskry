import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useCreatePositionModal } from "../CreatePositionModal/CreatePositionModalContext";

export function useCreatePositionTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();
  const { onOpenChange: onCreatePositionModalOpenChange } =
    useCreatePositionModal();

  const handlePress = () => {
    guestGuard(() => onCreatePositionModalOpenChange(true));
  };

  return handlePress;
}
