import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCurrentUserProvider } from "./MockedCurrentUserProvider";

export const withCurrentUserProvider: Decorator = (Story, context) => {
  const isGuest = context.parameters.isGuest || false;

  return (
    <MockedCurrentUserProvider isGuest={isGuest}>
      <Story />
    </MockedCurrentUserProvider>
  );
};
