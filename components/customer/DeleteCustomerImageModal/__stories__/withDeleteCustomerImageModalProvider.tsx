import { type Decorator } from "@storybook/react";
import { DeleteCustomerImageModalProvider } from "../DeleteCustomerImageModalContext";

export const withDeleteCustomerImageModalProvider: Decorator = (Story) => {
  return (
    <DeleteCustomerImageModalProvider>
      <Story />
    </DeleteCustomerImageModalProvider>
  );
};
