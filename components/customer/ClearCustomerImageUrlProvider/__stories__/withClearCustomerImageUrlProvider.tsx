import { type Decorator } from "@storybook/react";
import { MockedClearCustomerImageUrlProvider } from "./MockedClearCustomerImageUrlProvider";

export const withClearCustomerImageUrlProvider: Decorator = (Story) => {
  return (
    <MockedClearCustomerImageUrlProvider>
      <Story />
    </MockedClearCustomerImageUrlProvider>
  );
};
