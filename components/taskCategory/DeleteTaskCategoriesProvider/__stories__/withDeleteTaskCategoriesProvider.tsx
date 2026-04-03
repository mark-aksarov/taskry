import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteTaskCategoriesProvider } from "./MockedDeleteTaskCategoriesProvider";

export const withDeleteTaskCategoriesProvider: Decorator = (Story) => {
  return (
    <MockedDeleteTaskCategoriesProvider>
      <Story />
    </MockedDeleteTaskCategoriesProvider>
  );
};
