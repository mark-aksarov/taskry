import { useModal } from "@/components/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreateTaskCategoryTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create task category action and modal states
  const { onOpenChange: onTaskCategoryModalOpenChange } =
    useModal("createTaskCategory");

  const handlePress = () => {
    guestGuard(() => onTaskCategoryModalOpenChange(true));
  };

  return handlePress;
}
