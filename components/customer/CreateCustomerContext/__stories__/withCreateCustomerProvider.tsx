import { type Decorator } from "@storybook/react";
import { CreateCustomerProvider } from "../CreateCustomerContext";

export const withCreateCustomerProvider: Decorator = (Story) => {
  return (
    <CreateCustomerProvider createCustomer={() => ({ status: "success" })}>
      <Story />
    </CreateCustomerProvider>
  );
};
