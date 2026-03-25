import { type Decorator } from "@storybook/react";
import { MockedCreateProjectProvider } from "./MockedCreateProjectProvider";

export const withCreateProjectProvider: Decorator = (Story) => {
  return (
    <MockedCreateProjectProvider>
      <Story />
    </MockedCreateProjectProvider>
  );
};
