import { type Decorator } from "@storybook/react";
import { UpdateTaskCategoryModalProvider } from "../UpdateTaskCategoryModalContext";

export const withUpdateTaskCategoryModalProvider: Decorator = (Story) => {
  return (
    <UpdateTaskCategoryModalProvider>
      <Story />
    </UpdateTaskCategoryModalProvider>
  );
};
