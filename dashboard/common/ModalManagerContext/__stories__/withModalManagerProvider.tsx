import { type Decorator } from "@storybook/nextjs-vite";
import { ModalManagerProvider } from "../ModalManagerContext";

export const withModalManagerProvider: Decorator = (Story) => {
  return (
    <ModalManagerProvider>
      <Story />
    </ModalManagerProvider>
  );
};
