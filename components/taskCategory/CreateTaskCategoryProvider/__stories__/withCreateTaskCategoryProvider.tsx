import { type Decorator } from "@storybook/react";
import { MockedCreateTaskCategoryProvider } from "./MockedCreateTaskCategoryProvider";

export const withCreateTaskCategoryProvider: Decorator = (Story) => {
  return (
    <MockedCreateTaskCategoryProvider>
      <Story />
    </MockedCreateTaskCategoryProvider>
  );
};
