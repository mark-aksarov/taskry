import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserAddressProvider } from "./MockedUpdateUserAddressProvider";

export const withUpdateUserAddressProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserAddressProvider>
      <Story />
    </MockedUpdateUserAddressProvider>
  );
};
