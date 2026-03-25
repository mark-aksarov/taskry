import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useCreateProjectCategoryModal } from "../CreateProjectCategoryModal";

export function useCreateProjectCategoryTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onProjectCategoryModalOpenChange } =
    useCreateProjectCategoryModal();

  const handlePress = () => {
    guestGuard(() => onProjectCategoryModalOpenChange(true));
  };

  return handlePress;
}
