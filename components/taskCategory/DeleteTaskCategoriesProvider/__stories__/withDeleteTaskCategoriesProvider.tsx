import { type Decorator } from "@storybook/react";
import { MockedDeleteTaskCategoriesProvider } from "./MockedDeleteTaskCategoriesProvider";

export const withDeleteTaskCategoriesProvider: Decorator = (Story) => {
  return (
    <MockedDeleteTaskCategoriesProvider>
      <Story />
    </MockedDeleteTaskCategoriesProvider>
  );
};
