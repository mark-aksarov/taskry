import { useCreateCompanyModal } from "../CreateCompanyModal";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreateCompanyTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create company action and modal states
  const { onOpenChange: onModalOpenChange } = useCreateCompanyModal();

  const handlePress = () => {
    guestGuard(() => {
      onModalOpenChange(true);
    });
  };

  return handlePress;
}
