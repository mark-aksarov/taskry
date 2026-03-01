import { type Decorator } from "@storybook/react";
import { DeleteSubtaskTransitionProvider } from "../DeleteSubtaskTransitionContext";

export const withDeleteSubtaskTransitionProvider: Decorator = (Story) => {
  return (
    <DeleteSubtaskTransitionProvider>
      <Story />
    </DeleteSubtaskTransitionProvider>
  );
};
