import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskCategoryRelProvider } from "./MockedUpdateTaskCategoryRelProvider";

export const withUpdateTaskCategoryRelProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskCategoryRelProvider>
      <Story />
    </MockedUpdateTaskCategoryRelProvider>
  );
};
