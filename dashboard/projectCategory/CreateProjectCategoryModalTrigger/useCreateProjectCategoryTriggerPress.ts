import { useModal } from "@/common/ModalManagerContext";

export function useCreateProjectCategoryTriggerPress() {
  const { onOpenChange: onProjectCategoryModalOpenChange } = useModal(
    "createProjectCategory",
  );

  const handlePress = () => {
    onProjectCategoryModalOpenChange(true);
  };

  return handlePress;
}
