import { type Decorator } from "@storybook/react";
import { MockedCustomerItemProviders } from "./MockedCustomerItemProviders";

export const withCustomerItemProviders: Decorator = (Story) => {
  return (
    <MockedCustomerItemProviders>
      <Story />
    </MockedCustomerItemProviders>
  );
};
