import { type Decorator } from "@storybook/react";
import { MockedUpdateTaskCategoryProvider } from "./MockedUpdateTaskCategoryProvider";

export const withUpdateTaskCategoryProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskCategoryProvider>
      <Story />
    </MockedUpdateTaskCategoryProvider>
  );
};
