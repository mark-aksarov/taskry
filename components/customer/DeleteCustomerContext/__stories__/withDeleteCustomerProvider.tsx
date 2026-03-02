import { type Decorator } from "@storybook/react";
import { DeleteCustomerProvider } from "../DeleteCustomerContext";

export const withDeleteCustomerProvider: Decorator = (Story) => {
  return (
    <DeleteCustomerProvider deleteCustomer={() => ({ status: "success" })}>
      <Story />
    </DeleteCustomerProvider>
  );
};
