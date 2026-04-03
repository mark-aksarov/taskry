import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteProjectProvider } from "./MockedDeleteProjectProvider";

export const withDeleteProjectProvider: Decorator = (Story) => {
  return (
    <MockedDeleteProjectProvider>
      <Story />
    </MockedDeleteProjectProvider>
  );
};
