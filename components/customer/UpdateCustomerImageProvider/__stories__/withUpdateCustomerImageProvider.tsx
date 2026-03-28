import { type Decorator } from "@storybook/react";
import { MockedUpdateCustomerImageProvider } from "./MockedUpdateCustomerImageProvider";

export const withUpdateCustomerImageProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerImageProvider>
      <Story />
    </MockedUpdateCustomerImageProvider>
  );
};
