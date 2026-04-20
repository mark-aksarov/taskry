import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCustomerFullNameProvider } from "./MockedUpdateCustomerFullNameProvider";

export const withUpdateCustomerFullNameProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerFullNameProvider>
      <Story />
    </MockedUpdateCustomerFullNameProvider>
  );
};
