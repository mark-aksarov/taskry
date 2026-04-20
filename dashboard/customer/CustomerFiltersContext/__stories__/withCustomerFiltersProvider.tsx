import { type Decorator } from "@storybook/nextjs-vite";
import { CustomerFiltersProvider } from "../CustomerFiltersContext";

export const withCustomerFiltersProvider: Decorator = (Story) => {
  return (
    <CustomerFiltersProvider filters={{}}>
      <Story />
    </CustomerFiltersProvider>
  );
};
