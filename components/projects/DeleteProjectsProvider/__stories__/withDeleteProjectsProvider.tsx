import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteProjectsProvider } from "./MockedDeleteProjectsProvider";

export const withDeleteProjectsProvider: Decorator = (Story) => {
  return (
    <MockedDeleteProjectsProvider>
      <Story />
    </MockedDeleteProjectsProvider>
  );
};
