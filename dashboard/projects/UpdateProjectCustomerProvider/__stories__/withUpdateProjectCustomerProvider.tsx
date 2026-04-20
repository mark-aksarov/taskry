import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectCustomerProvider } from "./MockedUpdateProjectCustomerProvider";

export const withUpdateProjectCustomerProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectCustomerProvider>
      <Story />
    </MockedUpdateProjectCustomerProvider>
  );
};
