import { useModal } from "@/common/ModalManagerContext";

export function useCreateTaskCategoryTriggerPress() {
  const { onOpenChange: onTaskCategoryModalOpenChange } =
    useModal("createTaskCategory");

  const handlePress = () => {
    onTaskCategoryModalOpenChange(true);
  };

  return handlePress;
}
