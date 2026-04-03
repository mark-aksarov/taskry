import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteUserProvider } from "./MockedDeleteUserProvider";

export const withDeleteUserProvider: Decorator = (Story) => {
  return (
    <MockedDeleteUserProvider>
      <Story />
    </MockedDeleteUserProvider>
  );
};
