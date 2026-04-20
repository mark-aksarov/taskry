import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCustomerPhoneNumberProvider } from "./MockedUpdateCustomerPhoneNumberProvider";

export const withUpdateCustomerPhoneNumberProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerPhoneNumberProvider>
      <Story />
    </MockedUpdateCustomerPhoneNumberProvider>
  );
};
