import { type Decorator } from "@storybook/react";
import { DeleteCustomersProvider } from "../DeleteCustomersContext";

export const withDeleteCustomersProvider: Decorator = (Story) => {
  return (
    <DeleteCustomersProvider deleteCustomers={() => ({ status: "success" })}>
      <Story />
    </DeleteCustomersProvider>
  );
};
