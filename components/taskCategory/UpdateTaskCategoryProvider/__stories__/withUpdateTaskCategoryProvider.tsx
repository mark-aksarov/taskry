import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateTaskCategoryProvider } from "./MockedUpdateTaskCategoryProvider";

export const withUpdateTaskCategoryProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskCategoryProvider>
      <Story />
    </MockedUpdateTaskCategoryProvider>
  );
};
