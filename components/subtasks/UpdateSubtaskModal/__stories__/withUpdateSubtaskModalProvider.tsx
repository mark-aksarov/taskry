import { type Decorator } from "@storybook/react";
import { UpdateSubtaskModalProvider } from "../UpdateSubtaskModalContext";

export const withUpdateSubtaskModalProvider: Decorator = (Story) => {
  return (
    <UpdateSubtaskModalProvider>
      <Story />
    </UpdateSubtaskModalProvider>
  );
};
