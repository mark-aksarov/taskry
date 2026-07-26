import { useModal } from "@/common/ModalManagerContext";

export function useCreatePositionTriggerPress() {
  const { onOpenChange: onCreatePositionModalOpenChange } =
    useModal("createPosition");

  const handlePress = () => {
    onCreatePositionModalOpenChange(true);
  };

  return handlePress;
}
