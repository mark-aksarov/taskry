import { type Decorator } from "@storybook/react";
import { DeleteCustomerTransitionProvider } from "../DeleteCustomerTransitionContext";

export const withDeleteCustomerProvider: Decorator = (Story) => {
  return (
    <DeleteCustomerTransitionProvider>
      <Story />
    </DeleteCustomerTransitionProvider>
  );
};
