import { useModal } from "@/common/ModalManagerContext";

export function useCreateUserTriggerPress() {
  const { onOpenChange: onCreateUserModalOpenChange } = useModal("createUser");

  const handlePress = () => {
    onCreateUserModalOpenChange(true);
  };

  return handlePress;
}
