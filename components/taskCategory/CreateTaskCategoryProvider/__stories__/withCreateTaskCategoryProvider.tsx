import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateTaskCategoryProvider } from "./MockedCreateTaskCategoryProvider";

export const withCreateTaskCategoryProvider: Decorator = (Story) => {
  return (
    <MockedCreateTaskCategoryProvider>
      <Story />
    </MockedCreateTaskCategoryProvider>
  );
};
