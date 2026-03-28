import { useEffect } from "react";
import { useModal } from "../useModal";
import { Button } from "@/components/ui/Button";
import { type Decorator } from "@storybook/react";

export const withOpenModal: Decorator = (Story, context) => {
  const modalId = context.parameters.modalId;

  if (!modalId) {
    throw new Error("modalId is required");
  }

  const { onOpenChange } = useModal(modalId);

  useEffect(() => onOpenChange(true), [onOpenChange]);

  return (
    <>
      <Button label="Open modal" onClick={() => onOpenChange(true)} />
      <Story />
    </>
  );
};
