import { type Decorator } from "@storybook/react";
import { MockedCurrentUserProvider } from "./MockedCurrentUserProvider";

export const withCurrentUserProvider: Decorator = (Story, context) => {
  const isGuest = context.parameters.isGuest || false;

  return (
    <MockedCurrentUserProvider isGuest={isGuest}>
      <Story />
    </MockedCurrentUserProvider>
  );
};
