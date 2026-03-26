import { type Decorator } from "@storybook/react";
import { MockedCustomerDetailProviders } from "./MockedCustomerDetailProviders";

export const withCustomerDetailProviders: Decorator = (Story) => {
  return (
    <MockedCustomerDetailProviders>
      <Story />
    </MockedCustomerDetailProviders>
  );
};
