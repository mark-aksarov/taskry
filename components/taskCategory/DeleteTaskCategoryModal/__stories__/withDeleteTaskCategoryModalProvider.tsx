import { type Decorator } from "@storybook/react";
import { DeleteTaskCategoryModalProvider } from "../DeleteTaskCategoryModalContext";

export const withDeleteTaskCategoryModalProvider: Decorator = (Story) => {
  return (
    <DeleteTaskCategoryModalProvider
      deleteTaskCategories={() => ({ status: "success" })}
    >
      <Story />
    </DeleteTaskCategoryModalProvider>
  );
};
