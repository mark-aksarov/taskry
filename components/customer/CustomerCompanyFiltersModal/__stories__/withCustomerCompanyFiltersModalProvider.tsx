import { type Decorator } from "@storybook/react";
import { CustomerCompanyFiltersModalProvider } from "../CustomerCompanyFiltersModalContext";

export const withCustomerCompanyFiltersModalProvider: Decorator = (Story) => {
  return (
    <CustomerCompanyFiltersModalProvider>
      <Story />
    </CustomerCompanyFiltersModalProvider>
  );
};
