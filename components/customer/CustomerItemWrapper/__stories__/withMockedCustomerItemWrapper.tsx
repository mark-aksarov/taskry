import { Decorator } from "@storybook/nextjs-vite";
import { MockedCustomerItemWrapper } from "./MockedCustomerItemWrapper";

export const withMockedCustomerItemWrapper: Decorator = (Story) => {
  return (
    <MockedCustomerItemWrapper>
      <Story />
    </MockedCustomerItemWrapper>
  );
};
