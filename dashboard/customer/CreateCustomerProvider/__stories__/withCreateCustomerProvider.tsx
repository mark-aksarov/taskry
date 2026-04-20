import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateCustomerProvider } from "./MockedCreateCustomerProvider";

export const withCreateCustomerProvider: Decorator = (Story) => {
  return (
    <MockedCreateCustomerProvider>
      <Story />
    </MockedCreateCustomerProvider>
  );
};
