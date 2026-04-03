import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserProvider } from "./MockedUpdateUserProvider";

export const withUpdateUserProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserProvider>
      <Story />
    </MockedUpdateUserProvider>
  );
};
