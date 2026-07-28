import { useEffect } from "react";
import { Button } from "@/ui/Button";
import { type Decorator } from "@storybook/nextjs-vite";
import { useModal } from "../common/ModalManagerContext/useModal";

interface OpenModalDecoratorProps {
  modalId: string;
  Story: React.ComponentType;
}

function OpenModalDecorator({ modalId, Story }: OpenModalDecoratorProps) {
  const { onOpenChange } = useModal(modalId);

  useEffect(() => {
    onOpenChange(true);
  }, [onOpenChange]);

  return (
    <>
      <Button
        variant="accent"
        label="Open modal"
        onClick={() => onOpenChange(true)}
      />
      <Story />
    </>
  );
}

export const withOpenModal: Decorator = (Story, context) => {
  const modalId = context.parameters.modalId;

  if (!modalId) {
    throw new Error("modalId is required");
  }

  return <OpenModalDecorator modalId={modalId} Story={Story} />;
};
