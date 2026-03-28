import { useModal } from "@/components/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreateCompanyTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create company action and modal states
  const { onOpenChange: onModalOpenChange } = useModal("createCompany");

  const handlePress = () => {
    guestGuard(() => {
      onModalOpenChange(true);
    });
  };

  return handlePress;
}
