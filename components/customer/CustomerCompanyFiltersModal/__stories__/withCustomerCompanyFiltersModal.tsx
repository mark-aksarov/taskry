import { type Decorator } from "@storybook/react";
import { MockedCustomerCompanyFiltersModal } from "./MockedCustomerCompanyFiltersModal";

export const withCustomerCompanyFiltersModal: Decorator = (Story) => {
  return (
    <>
      <Story />
      <MockedCustomerCompanyFiltersModal />
    </>
  );
};
