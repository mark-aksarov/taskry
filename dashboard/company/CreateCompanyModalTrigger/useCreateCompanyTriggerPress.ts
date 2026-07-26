import { useModal } from "@/common/ModalManagerContext";

export function useCreateCompanyTriggerPress() {
  const { onOpenChange: onModalOpenChange } = useModal("createCompany");

  const handlePress = () => {
    onModalOpenChange(true);
  };

  return handlePress;
}
