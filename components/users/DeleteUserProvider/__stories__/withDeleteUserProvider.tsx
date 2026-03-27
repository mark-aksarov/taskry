import { type Decorator } from "@storybook/react";
import { MockedDeleteUserProvider } from "./MockedDeleteUserProvider";

export const withDeleteUserProvider: Decorator = (Story) => {
  return (
    <MockedDeleteUserProvider>
      <Story />
    </MockedDeleteUserProvider>
  );
};
