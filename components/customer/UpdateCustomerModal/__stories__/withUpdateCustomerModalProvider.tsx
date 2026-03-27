import { type Decorator } from "@storybook/react";
import { UpdateCustomerModalProvider } from "../UpdateCustomerModalContext";

export const withUpdateCustomerModalProvider: Decorator = (Story) => {
  return (
    <UpdateCustomerModalProvider>
      <Story />
    </UpdateCustomerModalProvider>
  );
};
