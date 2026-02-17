import { type Decorator } from "@storybook/react";
import { DeleteCustomerModalProvider } from "../DeleteCustomerModalContext";

export const withDeleteCustomerModalProvider: Decorator = (Story) => {
  return (
    <DeleteCustomerModalProvider
      deleteEntity={() =>
        new Promise((res) => setTimeout(() => res({ status: "success" }), 500))
      }
    >
      <Story />
    </DeleteCustomerModalProvider>
  );
};
