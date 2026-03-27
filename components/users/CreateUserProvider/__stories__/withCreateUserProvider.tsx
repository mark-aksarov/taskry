import { type Decorator } from "@storybook/react";
import { MockedCreateUserProvider } from "./MockedCreateUserProvider";

export const withCreateUserProvider: Decorator = (Story) => {
  return (
    <MockedCreateUserProvider>
      <Story />
    </MockedCreateUserProvider>
  );
};
