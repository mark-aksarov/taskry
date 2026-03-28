import { type Decorator } from "@storybook/react";
import { UpdateCustomerImageFileProvider } from "../UpdateCustomerImageFileContext";

export const withUpdateCustomerImageFileProvider: Decorator = (Story) => {
  return (
    <UpdateCustomerImageFileProvider>
      <Story />
    </UpdateCustomerImageFileProvider>
  );
};
