import { type Decorator } from "@storybook/nextjs-vite";
import { MockedRoleProvider } from "./MockedRoleProvider";

export const withRoleProvider: Decorator = (Story) => {
  return (
    <MockedRoleProvider>
      <Story />
    </MockedRoleProvider>
  );
};
