import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskCategoryForTaskProvider } from "./MockedUpdateTaskCategoryForTaskProvider";

export const withUpdateTaskCategoryForTaskProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskCategoryForTaskProvider>
      <Story />
    </MockedUpdateTaskCategoryForTaskProvider>
  );
};
