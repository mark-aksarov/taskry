import { type Decorator } from "@storybook/react";
import { UpdateCustomerProvider } from "../UpdateCustomerContext";

export const withUpdateCustomerProvider: Decorator = (Story) => {
  return (
    <UpdateCustomerProvider updateCustomer={() => ({ status: "success" })}>
      <Story />
    </UpdateCustomerProvider>
  );
};
