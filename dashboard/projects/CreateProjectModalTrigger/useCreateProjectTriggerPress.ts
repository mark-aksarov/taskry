import { useModal } from "@/common/ModalManagerContext";

export function useCreateProjectTriggerPress() {
  const { onOpenChange: onCreateProjectModalOpenChange } =
    useModal("createProject");

  const handlePress = () => {
    onCreateProjectModalOpenChange(true);
  };

  return handlePress;
}
