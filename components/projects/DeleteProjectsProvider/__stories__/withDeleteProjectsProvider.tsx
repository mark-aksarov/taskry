import { type Decorator } from "@storybook/react";
import { MockedDeleteProjectsProvider } from "./MockedDeleteProjectsProvider";

export const withDeleteProjectsProvider: Decorator = (Story) => {
  return (
    <MockedDeleteProjectsProvider>
      <Story />
    </MockedDeleteProjectsProvider>
  );
};
