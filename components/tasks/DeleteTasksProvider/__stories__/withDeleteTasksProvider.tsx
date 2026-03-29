import { type Decorator } from "@storybook/react";
import { MockedDeleteTasksProvider } from "./MockedDeleteTasksProvider";

export const withDeleteTasksProvider: Decorator = (Story) => {
  return (
    <MockedDeleteTasksProvider>
      <Story />
    </MockedDeleteTasksProvider>
  );
};
