import { type Decorator } from "@storybook/react";
import { MockedUpdateTaskStatusProvider } from "./MockedUpdateTaskStatusProvider";

export const withUpdateTaskStatusProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskStatusProvider>
      <Story />
    </MockedUpdateTaskStatusProvider>
  );
};
