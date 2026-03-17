import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";

export function useCreateTaskCategoryTriggerPress() {
  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create task category action and modal states
  const { onModalOpenChange: onTaskCategoryModalOpenChange } =
    useCreateTaskCategory();

  const handlePress = () => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    onTaskCategoryModalOpenChange(true);
  };

  return handlePress;
}
