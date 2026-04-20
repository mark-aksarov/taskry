import { type Decorator } from "@storybook/nextjs-vite";
import { UpdateCustomerImageFileProvider } from "../UpdateCustomerImageFileContext";

export const withUpdateCustomerImageFileProvider: Decorator = (Story) => {
  return (
    <UpdateCustomerImageFileProvider>
      <Story />
    </UpdateCustomerImageFileProvider>
  );
};
