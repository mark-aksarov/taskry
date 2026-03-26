import { type Decorator } from "@storybook/react";
import { CreateTaskCategoryModalProvider } from "../CreateTaskCategoryModalContext";

export const withCreateTaskCategoryModalProvider: Decorator = (Story) => {
  return (
    <CreateTaskCategoryModalProvider>
      <Story />
    </CreateTaskCategoryModalProvider>
  );
};
