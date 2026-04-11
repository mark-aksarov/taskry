import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCustomerEmailProvider } from "./MockedUpdateCustomerEmailProvider";

export const withUpdateCustomerEmailProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerEmailProvider>
      <Story />
    </MockedUpdateCustomerEmailProvider>
  );
};
