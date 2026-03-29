import { useModal } from "@/components/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreateTaskTriggerPress() {
  const guestGuard = useGuestModalGuard();
  const { onOpenChange: onCreateTaskModalOpenChange } = useModal("createTask");

  const handlePress = () => {
    guestGuard(() => onCreateTaskModalOpenChange(true));
  };

  return handlePress;
}
