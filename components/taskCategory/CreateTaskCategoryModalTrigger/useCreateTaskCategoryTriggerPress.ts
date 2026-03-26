import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useCreateTaskCategoryModal } from "../CreateTaskCategoryModal/CreateTaskCategoryModalContext";

export function useCreateTaskCategoryTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create task category action and modal states
  const { onOpenChange: onTaskCategoryModalOpenChange } =
    useCreateTaskCategoryModal();

  const handlePress = () => {
    guestGuard(() => onTaskCategoryModalOpenChange(true));
  };

  return handlePress;
}
