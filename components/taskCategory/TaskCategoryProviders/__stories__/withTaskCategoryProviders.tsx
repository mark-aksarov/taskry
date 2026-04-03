import { type Decorator } from "@storybook/nextjs-vite";
import { MockedTaskCategoryProviders } from "./MockedTaskCategoryProviders";

export const withTaskCategoryProviders: Decorator = (Story) => {
  return (
    <MockedTaskCategoryProviders>
      <Story />
    </MockedTaskCategoryProviders>
  );
};
