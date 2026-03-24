import { type Decorator } from "@storybook/react";
import { MockedDeleteCustomerProvider } from "./MockedDeleteCustomerProvider";

export const withDeleteCustomerProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCustomerProvider>
      <Story />
    </MockedDeleteCustomerProvider>
  );
};
