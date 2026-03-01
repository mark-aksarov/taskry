import { type Decorator } from "@storybook/react";
import { UpdateTaskStatusTransitionProvider } from "../UpdateTaskStatusTransitionContext";

export const withDeleteTaskTransitionProvider: Decorator = (Story) => {
  return (
    <UpdateTaskStatusTransitionProvider>
      <Story />
    </UpdateTaskStatusTransitionProvider>
  );
};
