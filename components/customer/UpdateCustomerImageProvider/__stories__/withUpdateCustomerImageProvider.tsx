import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCustomerImageProvider } from "./MockedUpdateCustomerImageProvider";

export const withUpdateCustomerImageProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerImageProvider>
      <Story />
    </MockedUpdateCustomerImageProvider>
  );
};
