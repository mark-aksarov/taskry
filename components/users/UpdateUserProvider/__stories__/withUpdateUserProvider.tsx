import { type Decorator } from "@storybook/react";
import { MockedUpdateUserProvider } from "./MockedUpdateUserProvider";

export const withUpdateUserProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserProvider>
      <Story />
    </MockedUpdateUserProvider>
  );
};
