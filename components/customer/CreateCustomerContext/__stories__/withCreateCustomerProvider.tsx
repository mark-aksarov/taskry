import { type Decorator } from "@storybook/react";
import { MockedCreateCustomerProvider } from "./MockedCreateCustomerProvider";

export const withCreateCustomerProvider: Decorator = (Story) => {
  return (
    <MockedCreateCustomerProvider>
      <Story />
    </MockedCreateCustomerProvider>
  );
};
