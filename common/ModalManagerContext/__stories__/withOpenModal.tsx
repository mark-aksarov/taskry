import { useEffect } from "react";
import { useModal } from "../useModal";
import { Button } from "@/ui/Button";
import { type Decorator } from "@storybook/react";

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
      <Button label="Open modal" onClick={() => onOpenChange(true)} />
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
