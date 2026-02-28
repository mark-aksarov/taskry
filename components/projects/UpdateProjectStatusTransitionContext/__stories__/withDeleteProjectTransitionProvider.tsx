import { type Decorator } from "@storybook/react";
import { UpdateProjectStatusTransitionProvider } from "../UpdateProjectStatusTransitionContext";

export const withDeleteProjectTransitionProvider: Decorator = (Story) => {
  return (
    <UpdateProjectStatusTransitionProvider>
      <Story />
    </UpdateProjectStatusTransitionProvider>
  );
};
