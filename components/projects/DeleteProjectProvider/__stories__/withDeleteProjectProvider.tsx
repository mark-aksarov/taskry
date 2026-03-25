import { type Decorator } from "@storybook/react";
import { MockedDeleteProjectProvider } from "./MockedDeleteProjectProvider";

export const withDeleteProjectProvider: Decorator = (Story) => {
  return (
    <MockedDeleteProjectProvider>
      <Story />
    </MockedDeleteProjectProvider>
  );
};
