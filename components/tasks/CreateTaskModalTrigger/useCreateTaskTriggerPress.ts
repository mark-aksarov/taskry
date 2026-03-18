import { useCreateTask } from "../CreateTaskContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreateTaskTriggerPress() {
  const guestGuard = useGuestModalGuard();
  const { onModalOpenChange: onCreateTaskModalOpenChange } = useCreateTask();

  const handlePress = () => {
    guestGuard(() => onCreateTaskModalOpenChange(true));
  };

  return handlePress;
}
