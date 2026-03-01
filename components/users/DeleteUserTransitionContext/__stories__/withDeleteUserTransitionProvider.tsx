import { type Decorator } from "@storybook/react";
import { DeleteUserTransitionProvider } from "../DeleteUserTransitionContext";

export const withDeleteUserTransitionProvider: Decorator = (Story) => {
  return (
    <DeleteUserTransitionProvider>
      <Story />
    </DeleteUserTransitionProvider>
  );
};
