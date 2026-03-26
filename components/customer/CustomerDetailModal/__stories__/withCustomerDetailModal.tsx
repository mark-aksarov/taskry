import { type Decorator } from "@storybook/react";
import { CustomerDetailModalProvider } from "../CustomerDetailModalContext";

export const withCustomerDetailModal: Decorator = (Story) => {
  return (
    <CustomerDetailModalProvider>
      <Story />
    </CustomerDetailModalProvider>
  );
};
