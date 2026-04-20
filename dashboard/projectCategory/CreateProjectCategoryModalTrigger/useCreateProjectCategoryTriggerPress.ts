import { useModal } from "@/dashboard/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";

export function useCreateProjectCategoryTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onProjectCategoryModalOpenChange } = useModal(
    "createProjectCategory",
  );

  const handlePress = () => {
    guestGuard(() => onProjectCategoryModalOpenChange(true));
  };

  return handlePress;
}
