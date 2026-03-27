import { type Decorator } from "@storybook/react";
import { MockedCustomerFiltersModal } from "./MockedCustomerFiltersModal";

export const withCustomerFiltersModal: Decorator = (Story) => {
  return (
    <>
      <Story />
      <MockedCustomerFiltersModal />
    </>
  );
};
