import { type Decorator } from "@storybook/react";
import { ModalManagerProvider } from "../ModalManagerContext";

export const withModalManagerProvider: Decorator = (Story) => {
  return (
    <ModalManagerProvider>
      <Story />
    </ModalManagerProvider>
  );
};
