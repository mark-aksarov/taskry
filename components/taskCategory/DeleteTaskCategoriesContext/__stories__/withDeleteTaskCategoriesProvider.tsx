import { type Decorator } from "@storybook/react";
import { DeleteTaskCategoriesProvider } from "../../DeleteTaskCategoriesContext";

export const withDeleteTaskCategoriesProvider: Decorator = (Story) => {
  return (
    <DeleteTaskCategoriesProvider
      deleteTaskCategories={() => ({ status: "success" })}
    >
      <Story />
    </DeleteTaskCategoriesProvider>
  );
};
