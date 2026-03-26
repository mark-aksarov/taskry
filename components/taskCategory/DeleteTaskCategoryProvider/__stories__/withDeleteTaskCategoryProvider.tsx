import { type Decorator } from "@storybook/react";
import { MockedDeleteTaskCategoryProvider } from "./MockedDeleteTaskCategoryProvider";

export const withDeleteTaskCategoryProvider: Decorator = (Story) => {
  return (
    <MockedDeleteTaskCategoryProvider>
      <Story />
    </MockedDeleteTaskCategoryProvider>
  );
};
