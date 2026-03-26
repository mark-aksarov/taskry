import { type Decorator } from "@storybook/react";
import { CreateSubtaskModalProvider } from "../CreateSubtaskModalContext";

export const withCreateSubtaskModalProvider: Decorator = (Story) => {
  return (
    <CreateSubtaskModalProvider>
      <Story />
    </CreateSubtaskModalProvider>
  );
};
