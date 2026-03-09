import { type Decorator } from "@storybook/react";
import { CustomerItemProviders } from "../CustomerItemProviders";

export const withCustomerItemProviders: Decorator = (Story) => {
  return (
    <CustomerItemProviders
      customerId={1}
      updateCustomer={() => ({ status: "success" })}
      deleteCustomer={() => ({ status: "success" })}
    >
      <Story />
    </CustomerItemProviders>
  );
};
