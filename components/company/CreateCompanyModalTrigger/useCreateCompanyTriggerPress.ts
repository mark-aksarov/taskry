import { useCreateCompany } from "../CreateCompanyContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreateCompanyTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create company action and modal states
  const { onModalOpenChange: onCompanyModalOpenChange } = useCreateCompany();

  const handlePress = () => {
    guestGuard(() => {
      onCompanyModalOpenChange(true);
    });
  };

  return handlePress;
}
