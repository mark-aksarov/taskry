import { type Decorator } from "@storybook/react";
import { DeleteProjectTransitionProvider } from "../DeleteProjectTransitionContext";

export const withDeleteProjectTransitionProvider: Decorator = (Story) => {
  return (
    <DeleteProjectTransitionProvider>
      <Story />
    </DeleteProjectTransitionProvider>
  );
};
