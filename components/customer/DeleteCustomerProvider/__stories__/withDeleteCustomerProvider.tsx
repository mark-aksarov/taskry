import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteCustomerProvider } from "./MockedDeleteCustomerProvider";

export const withDeleteCustomerProvider: Decorator = (Story) => {
  return (
    <MockedDeleteCustomerProvider>
      <Story />
    </MockedDeleteCustomerProvider>
  );
};
