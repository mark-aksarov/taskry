import { type Decorator } from "@storybook/react";
import { DeleteTaskTransitionProvider } from "../DeleteTaskTransitionContext";

export const withDeleteTaskTransitionProvider: Decorator = (Story) => {
  return (
    <DeleteTaskTransitionProvider>
      <Story />
    </DeleteTaskTransitionProvider>
  );
};
