import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateCustomerPublicLinkProvider } from "./MockedUpdateCustomerPublicLinkProvider";

export const withUpdateCustomerPublicLinkProvider: Decorator = (Story) => {
  return (
    <MockedUpdateCustomerPublicLinkProvider>
      <Story />
    </MockedUpdateCustomerPublicLinkProvider>
  );
};
