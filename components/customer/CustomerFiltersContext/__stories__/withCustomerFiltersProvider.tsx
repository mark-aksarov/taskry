import { type Decorator } from "@storybook/react";
import { CustomerFiltersProvider } from "../CustomerFiltersContext";

export const withCustomerFiltersProvider: Decorator = (Story) => {
  return (
    <CustomerFiltersProvider>
      <Story />
    </CustomerFiltersProvider>
  );
};
