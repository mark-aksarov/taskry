import { type Decorator } from "@storybook/react";
import { MockedDeleteCustomersProvider } from "./MockedDeleteCustomersProvider";

export const withDeleteCustomersProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCustomersProvider>
      <Story />
    </MockedDeleteCustomersProvider>
  );
};
