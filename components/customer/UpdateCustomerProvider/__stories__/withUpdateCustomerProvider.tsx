import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCustomerProvider } from "./MockedUpdateCustomerProvider";

export const withUpdateCustomerProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerProvider>
      <Story />
    </MockedUpdateCustomerProvider>
  );
};
