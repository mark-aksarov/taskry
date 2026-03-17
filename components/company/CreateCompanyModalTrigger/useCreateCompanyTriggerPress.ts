import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCreateCompany } from "../CreateCompanyContext";

export function useCreateCompanyTriggerPress() {
  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create company action and modal states
  const { onModalOpenChange: onCompanyModalOpenChange } = useCreateCompany();

  const handlePress = () => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    onCompanyModalOpenChange(true);
  };

  return handlePress;
}
