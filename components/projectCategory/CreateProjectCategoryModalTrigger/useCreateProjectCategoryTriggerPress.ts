import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";

export function useCreateProjectCategoryTriggerPress() {
  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create project category action and modal states
  const { onModalOpenChange: onProjectCategoryModalOpenChange } =
    useCreateProjectCategory();

  const handlePress = () => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    onProjectCategoryModalOpenChange(true);
  };

  return handlePress;
}
