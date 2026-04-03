import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteTaskCategoryProvider } from "./MockedDeleteTaskCategoryProvider";

export const withDeleteTaskCategoryProvider: Decorator = (Story) => {
  return (
    <MockedDeleteTaskCategoryProvider>
      <Story />
    </MockedDeleteTaskCategoryProvider>
  );
};
