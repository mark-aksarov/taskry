import { useModal } from "@/common/ModalManagerContext";

export function useCreateClientTriggerPress() {
  const { onOpenChange: onCreateClientModalOpenChange } =
    useModal("createClient");

  const handlePress = () => {
    onCreateClientModalOpenChange(true);
  };

  return handlePress;
}
