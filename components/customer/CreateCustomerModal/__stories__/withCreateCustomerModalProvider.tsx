import { type Decorator } from "@storybook/react";
import { CreateCustomerModalProvider } from "../CreateCustomerModalContext";

export const withCreateCustomerModalProvider: Decorator = (Story) => {
  return (
    <CreateCustomerModalProvider>
      <Story />
    </CreateCustomerModalProvider>
  );
};
