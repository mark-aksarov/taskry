import { type Decorator } from "@storybook/react";
import { DeletePositionModalProvider } from "../DeletePositionModalContext";

export const withDeletePositionModalProvider: Decorator = (Story) => {
  return (
    <DeletePositionModalProvider>
      <Story />
    </DeletePositionModalProvider>
  );
};
