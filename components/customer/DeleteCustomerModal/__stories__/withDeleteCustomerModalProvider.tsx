import { type Decorator } from "@storybook/react";
import { DeleteCustomerModalProvider } from "../DeleteCustomerModalContext";

export const withDeleteCustomerModalProvider: Decorator = (Story) => {
  return (
    <DeleteCustomerModalProvider>
      <Story />
    </DeleteCustomerModalProvider>
  );
};
