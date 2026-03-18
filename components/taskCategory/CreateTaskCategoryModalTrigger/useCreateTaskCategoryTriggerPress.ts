import { useCreateTaskCategory } from "../CreateTaskCategoryContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreateTaskCategoryTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Create task category action and modal states
  const { onModalOpenChange: onTaskCategoryModalOpenChange } =
    useCreateTaskCategory();

  const handlePress = () => {
    guestGuard(() => onTaskCategoryModalOpenChange(true));
  };

  return handlePress;
}
