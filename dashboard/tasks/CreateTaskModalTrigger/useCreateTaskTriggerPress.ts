import { useModal } from "@/common/ModalManagerContext";

export function useCreateTaskTriggerPress() {
  const { onOpenChange: onCreateTaskModalOpenChange } = useModal("createTask");

  const handlePress = () => {
    onCreateTaskModalOpenChange(true);
  };

  return handlePress;
}
