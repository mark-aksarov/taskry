import { type Decorator } from "@storybook/react";
import { MockedUpdateCustomerProvider } from "./MockedUpdateCustomerProvider";

export const withUpdateCustomerProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerProvider>
      <Story />
    </MockedUpdateCustomerProvider>
  );
};
