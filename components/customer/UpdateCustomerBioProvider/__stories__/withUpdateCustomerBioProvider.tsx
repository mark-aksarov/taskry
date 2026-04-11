import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCustomerBioProvider } from "./MockedUpdateCustomerBioProvider";

export const withUpdateCustomerBioProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerBioProvider>
      <Story />
    </MockedUpdateCustomerBioProvider>
  );
};
