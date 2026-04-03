import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteTasksProvider } from "./MockedDeleteTasksProvider";

export const withDeleteTasksProvider: Decorator = (Story) => {
  return (
    <MockedDeleteTasksProvider>
      <Story />
    </MockedDeleteTasksProvider>
  );
};
