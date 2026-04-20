import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCustomerCompanyProvider } from "./MockedUpdateCustomerCompanyProvider";

export const withUpdateCustomerCompanyProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerCompanyProvider>
      <Story />
    </MockedUpdateCustomerCompanyProvider>
  );
};
