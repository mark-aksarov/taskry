import { type Decorator } from "@storybook/react";
import { DeleteCustomerImageProvider } from "../DeleteCustomerImageContext";

export const withDeleteCustomerImageProvider: Decorator = (Story) => {
  return (
    <DeleteCustomerImageProvider
      updateCustomerImageUrl={() => ({ status: "success" })}
    >
      <Story />
    </DeleteCustomerImageProvider>
  );
};
