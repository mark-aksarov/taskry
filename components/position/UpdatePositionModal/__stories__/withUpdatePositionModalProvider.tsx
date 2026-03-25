import { type Decorator } from "@storybook/react";
import { UpdatePositionModalProvider } from "../UpdatePositionModalContext";

export const withUpdatePositionModalProvider: Decorator = (Story) => {
  return (
    <UpdatePositionModalProvider>
      <Story />
    </UpdatePositionModalProvider>
  );
};
