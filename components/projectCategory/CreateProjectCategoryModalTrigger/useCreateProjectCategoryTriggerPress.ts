import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";

export function useCreateProjectCategoryTriggerPress() {
  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  const { onModalOpenChange: onProjectCategoryModalOpenChange } =
    useCreateProjectCategory();

  const handlePress = () => {
    guestGuard(() => onProjectCategoryModalOpenChange(true));
  };

  return handlePress;
}
