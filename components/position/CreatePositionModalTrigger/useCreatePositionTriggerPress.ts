import { useCreatePosition } from "../CreatePositionContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreatePositionTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();
  const { onModalOpenChange: onCreatePositionModalOpenChange } =
    useCreatePosition();

  const handlePress = () => {
    guestGuard(() => onCreatePositionModalOpenChange(true));
  };

  return handlePress;
}
