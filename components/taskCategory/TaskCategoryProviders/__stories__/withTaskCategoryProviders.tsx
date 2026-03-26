import { type Decorator } from "@storybook/react";
import { MockedTaskCategoryProviders } from "./MockedTaskCategoryProviders";

export const withTaskCategoryProviders: Decorator = (Story) => {
  return (
    <MockedTaskCategoryProviders>
      <Story />
    </MockedTaskCategoryProviders>
  );
};
