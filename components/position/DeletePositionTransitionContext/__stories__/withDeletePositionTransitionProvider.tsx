import { type Decorator } from "@storybook/react";
import { DeletePositionTransitionProvider } from "../DeletePositionTransitionContext";

export const withDeletePositionTransitionProvider: Decorator = (Story) => {
  return (
    <DeletePositionTransitionProvider>
      <Story />
    </DeletePositionTransitionProvider>
  );
};
