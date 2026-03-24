import { type Decorator } from "@storybook/react";
import { MockedCustomerProviders } from "./MockedCustomerProviders";

export const withCustomerProviders: Decorator = (Story) => {
  return (
    <MockedCustomerProviders>
      <Story />
    </MockedCustomerProviders>
  );
};
