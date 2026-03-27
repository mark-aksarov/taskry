import { type Decorator } from "@storybook/react";
import { CustomerFiltersModalProvider } from "../CustomerFiltersModalContext";

export const withCustomerFiltersModalProvider: Decorator = (Story) => {
  return (
    <CustomerFiltersModalProvider>
      <Story />
    </CustomerFiltersModalProvider>
  );
};
