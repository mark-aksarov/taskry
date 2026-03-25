import { type Decorator } from "@storybook/react";
import { CreatePositionModalProvider } from "../CreatePositionModalContext";

export const withCreatePositionModalProvider: Decorator = (Story) => {
  return (
    <CreatePositionModalProvider>
      <Story />
    </CreatePositionModalProvider>
  );
};
