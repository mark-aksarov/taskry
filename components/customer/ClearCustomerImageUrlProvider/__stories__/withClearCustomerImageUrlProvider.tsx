import { type Decorator } from "@storybook/nextjs-vite";
import { MockedClearCustomerImageUrlProvider } from "./MockedClearCustomerImageUrlProvider";

export const withClearCustomerImageUrlProvider: Decorator = (Story) => {
  return (
    <MockedClearCustomerImageUrlProvider>
      <Story />
    </MockedClearCustomerImageUrlProvider>
  );
};
